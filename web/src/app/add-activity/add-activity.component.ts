import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ActivityType, ApiRequestsService, Teacher } from '../api-requests.service';
import { Activit1, Monitor } from '../activities-display/activities-display.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-activity',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-activity.component.html',
  styleUrl: './add-activity.component.css'
})
export class AddActivityComponent {
  @Input() startDate: string = "";
  @Input() endDate: string = "";
  @Input() putActivity: Activit1 | null = null;
  @Output() toggleView = new EventEmitter<void>();
  accept(): void{
    if (this.putActivity) {
      this.pepitoService.updateActivity(this.putActivity.id, this.newActivity).subscribe({
        next: (response) => {
          console.log('Activity updated successfully:', response);
          this.pepitoService.notify(null);
        },
        error: (error) => {
          console.error('Error updating activity:', error);
        }
      });
    }else{
      this.pepitoService.createActivity(this.newActivity).subscribe({
        next: (response) => {console.log('Activity created successfully:', response), this.pepitoService.notify(null);},
        error: (error) => console.error('Error creating activity:', error)
      });
      console.log(this.newActivity);
    }
    
  }

  cancel(): void{
    this.toggleView.emit();
  }

  public activityTypes: ActivityType[] = [];
  public teachers: Teacher[] = [];
  public selectedMonitorId: number = -1;

  newActivity: Omit<Activit1, 'id'>;

  constructor(private pepitoService: ApiRequestsService) {
    this.newActivity = {
      activity_type: -1,  // will be set later
      monitors: [],  // will be set later
      date_start: this.startDate,
      date_end: this.endDate
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate']) {
      this.newActivity.date_start = changes['startDate'].currentValue || "";
    }
    if (changes['endDate']) {
      this.newActivity.date_end = changes['endDate'].currentValue || "";
    }
    if (changes['putActivity'] && this.putActivity) {
      this.setDefaultValues(this.putActivity);
      console.log(this.putActivity);
      console.log(this.newActivity);
    }
  }
  

  addMonitorToActivity() {
    console.log("Before adding monitor - selectedMonitorId:", this.selectedMonitorId);

    if (this.selectedMonitorId && !this.newActivity.monitors.some(m => m.id === this.selectedMonitorId)) {
      this.newActivity.monitors.push({ id: this.selectedMonitorId } as Monitor);
    }
    setTimeout(() => this.selectedMonitorId = -1);
    console.log("After adding monitor - selectedMonitorId:", this.selectedMonitorId);
  }
  
  removeMonitorFromActivity(monitorId: number) {
    this.newActivity.monitors = this.newActivity.monitors.filter(m => m.id !== monitorId);
  }


  setDefaultValues(activity: Activit1): void {
    // Assuming newActivity and selectedMonitorId are already defined in your component
    this.newActivity.activity_type = activity.activity_type;
    this.newActivity.date_start = activity.date_start;
    this.newActivity.date_end = activity.date_end;
    
    // If monitors array is not empty, set the selectedMonitorId to the first monitor's id
    if (activity.monitors && activity.monitors.length > 0) {
       for (let i = 0; i < activity.monitors.length; i++) {
        this.newActivity.monitors.push({ id: activity.monitors[i].id } as Monitor);
       }
    }

    console.log(this.selectedMonitorId);
  }


  ngOnInit(): void {
    this.getActivityTypes();
    this.getTeachers();
    this.pepitoService.obs.subscribe(() => this.getActivityTypes());
    this.pepitoService.obs.subscribe(() => this.getTeachers());
    console.log(this.selectedMonitorId);
  }

  getActivityTypes(): void {
    this.pepitoService.getActivityTypesByApi()
    .subscribe((items) => 
    {
      this.activityTypes = items;
    });
    console.log(this.activityTypes);
  }

  getTeachers(): void {
    this.pepitoService.getTeachersByApi()
    .subscribe((items) => 
    {
      this.teachers = items;
    });
    console.log(this.teachers);
  }
}

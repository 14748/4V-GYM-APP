import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Activity, ActivityType, ApiRequestsService, Teacher } from '../api-requests.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


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
  @Input() putActivity: Activity | null = null;
  @Output() toggleView = new EventEmitter<void>();
  
  accept(): void{
    if (this.putActivity) {
      this.apiRequestService.updateActivity(this.putActivity.id, this.newActivity).subscribe({
        next: () => {
          this.toastr.success('Activity updated successfully');
          this.apiRequestService.notify(null);
          this.toggleView.emit();
        },
        error: (error) => {
          this.toastr.error(error, 'There was an error updating the activity')
        }
      });
    }else{
      this.apiRequestService.createActivity(this.newActivity).subscribe({
        next: () => 
        {
          this.toastr.success('Activity created successfully');
          this.apiRequestService.notify(null);
          this.toggleView.emit();
        },
        error: (error) => this.toastr.error(error, 'There was an error creating the activity')
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

  newActivity: Omit<Activity, 'id'>;

  constructor(private apiRequestService: ApiRequestsService, private toastr: ToastrService) {
    this.newActivity = {
      activity_type: -1,
      monitors: [],
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
      this.newActivity.monitors.push({ id: this.selectedMonitorId } as Teacher);
    }
    setTimeout(() => this.selectedMonitorId = -1);
    console.log("After adding monitor - selectedMonitorId:", this.selectedMonitorId);
  }
  
  removeMonitorFromActivity(monitorId: number) {
    this.newActivity.monitors = this.newActivity.monitors.filter(m => m.id !== monitorId);
  }


  setDefaultValues(activity: Activity): void {
    this.newActivity.activity_type = activity.activity_type;
    this.newActivity.date_start = activity.date_start;
    this.newActivity.date_end = activity.date_end;
    
    if (activity.monitors && activity.monitors.length > 0) {
       for (const element of activity.monitors) {
        this.newActivity.monitors.push({ id: element.id } as Teacher);
       }
    }

    console.log(this.selectedMonitorId);
  }


  ngOnInit(): void {
    this.getActivityTypes();
    this.getTeachers();
    this.apiRequestService.obs.subscribe(() => this.getActivityTypes());
    this.apiRequestService.obs.subscribe(() => this.getTeachers());
    console.log(this.selectedMonitorId);
  }

  getActivityTypes(): void {
    this.apiRequestService.getActivityTypesByApi()
    .subscribe((items) => 
    {
      this.activityTypes = items;
    });
    console.log(this.activityTypes);
  }

  getTeachers(): void {
    this.apiRequestService.getTeachersByApi()
    .subscribe((items) => 
    {
      this.teachers = items;
    });
    console.log(this.teachers);
  }
}

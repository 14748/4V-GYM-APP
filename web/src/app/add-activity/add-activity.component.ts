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
  @Output() toggleView = new EventEmitter<void>();
  accept(): void{
    this.pepitoService.createActivity(this.newActivity).subscribe({
      next: (response) => console.log('Activity created successfully:', response),
      error: (error) => console.error('Error creating activity:', error)
    });
    console.log(this.newActivity);
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
  }

  addMonitorToActivity() {
    if (this.selectedMonitorId && !this.newActivity.monitors.some(m => m.id === this.selectedMonitorId)) {
      this.newActivity.monitors.push({ id: this.selectedMonitorId } as Monitor);
    }
  }


  ngOnInit(): void {
    this.getActivityTypes();
    this.getTeachers();
    this.pepitoService.obs.subscribe(() => this.getActivityTypes());
    this.pepitoService.obs.subscribe(() => this.getTeachers());
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

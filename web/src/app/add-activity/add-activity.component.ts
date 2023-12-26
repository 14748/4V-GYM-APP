import { Component, EventEmitter, Output } from '@angular/core';
import { ActivityType, ApiRequestsService, Teacher } from '../api-requests.service';

@Component({
  selector: 'app-add-activity',
  standalone: true,
  imports: [],
  templateUrl: './add-activity.component.html',
  styleUrl: './add-activity.component.css'
})
export class AddActivityComponent {
  @Output() toggleView = new EventEmitter<void>();
  accept(): void{
    //TODO: use rest api
  }

  cancel(): void{
    this.toggleView.emit();
  }

  public activityTypes: ActivityType[] = [];
  public teachers: Teacher[] = [];

  constructor(private pepitoService: ApiRequestsService) {}

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

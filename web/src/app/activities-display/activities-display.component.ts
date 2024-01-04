import { Component, Input } from '@angular/core';
import { Activity, ApiRequestsService, Teacher } from '../api-requests.service';
import { FormatTimePipe } from '../format-time.pipe';
import { AddActivityComponent } from '../add-activity/add-activity.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activities-display',
  standalone: true,
  imports: [FormatTimePipe, AddActivityComponent],
  templateUrl: './activities-display.component.html',
  styleUrl: './activities-display.component.css'
})



export class ActivitiesDisplayComponent {
  setStartHour(time: number): void{
    this.currentTime = time.toString();
  }

  addActivity: boolean = false;
  startDate: string = "";
  endDate: string = "";
  changeActivityStatus(): void{
    this.putActivity = null;
    this.addActivity = !this.addActivity;
  }

  setDates(act: Activity ): void{
    this.startDate = act.date_start;
    this.endDate = act.date_end;
  }


  getActivitiesForToday(): Activity[] {
    const requiredTimes = [10, 13, 17];
    const today = this.selectedDate;
  
    let dayActivities = this.items
        .filter(act => {
            const actDate = new Date(act.date_start);
            return actDate.getDate() === today.getDate() &&
                actDate.getMonth() === today.getMonth() &&
                actDate.getFullYear() === today.getFullYear() &&
                requiredTimes.includes(actDate.getHours());
        });
  
    requiredTimes.forEach(hour => {
        let minutes = 0;
        if (hour === 13 || hour === 17) {
            minutes = 30;
        }
  
        if (!dayActivities.some(act => {
            const actDate = new Date(act.date_start);
            return actDate.getHours() === hour && actDate.getMinutes() === minutes;
        })) {
            const placeholderActivity: Activity = {
                id: -1,
                activity_type: -1,
                monitors: [],
                date_start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minutes).toISOString(),
                date_end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour + 1, minutes + 30).toISOString(),
            };
            dayActivities.push(placeholderActivity);
        }
    });
  
    dayActivities.sort((a, b) => {
        const dateA = new Date(a.date_start).getTime();
        const dateB = new Date(b.date_start).getTime();
        return dateA - dateB;
    });
  
    return dayActivities;
  }

  getImagePath(type: number): string {
    switch(type) {
      case 0:
        return "../../assets/img/pillates.svg";
      case 1:
        return "../../assets/img/spinning.svg";
      case 2:
        return "../../assets/img/bodypump.svg";
      default:
        return "../../assets/img/default.svg";
    }
}
  currentTime: string = "";
  @Input() selectedDate: Date = new Date();

  public items: Activity[] = [];

  constructor(private apiRequestService: ApiRequestsService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getItems();
    this.apiRequestService.obs.subscribe(() => this.getItems());
  }

  getItems(): void {
    this.apiRequestService.getActivitiesByApi()
    .subscribe((items) => 
    {
      this.items = items;
    });
    console.log(this.items);
  }

  deleteItem(id: number): void {
    this.apiRequestService.deleteActivity(id).subscribe({
      next: () => {
        this.toastr.success('Activity deleted successfully');
        this.apiRequestService.notify(null);
      },
      error: (error) => {
        this.toastr.error(error, 'There was an error deleting the activity')
      }
    });
  }

  putActivity: Activity | null = null;

  editItem(item: Activity): void {
    this.putActivity = item;
    this.addActivity = !this.addActivity;
  }


}

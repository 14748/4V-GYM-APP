import { Component, Input } from '@angular/core';
import { AddActivityComponent } from '../add-activity/add-activity.component';


export enum Type {
  Pillates = "Pillates",
  BodyPump = "BodyPump",
  Spinning = "Spinning"
}

export interface Activity{
  date: Date,
  monitor1: string,
  monitor2: string,
  type: Type
}

@Component({
  selector: 'app-activities-display',
  standalone: true,
  imports: [AddActivityComponent],
  templateUrl: './activities-display.component.html',
  styleUrl: './activities-display.component.css'
})



export class ActivitiesDisplayComponent {
  
  addActivity: boolean = false;

  changeActivityStatus(): void{
    this.addActivity = !this.addActivity;
  }

 activities: Activity[] = [
  { date: new Date('2023-12-05T17:30:00'), monitor1: 'Monitor6', type: Type.Pillates, monitor2: '' },
  { date: new Date('2023-12-05T13:30:00'), monitor1: 'Monitor3', type: Type.Spinning, monitor2: '' },
  { date: new Date('2023-12-06T13:30:00'), monitor1: 'Monitor1', type: Type.BodyPump, monitor2: 'Monitor16' },
  { date: new Date('2023-12-07T13:30:00'), monitor1: 'Monitor9', type: Type.Pillates, monitor2: 'Monitor12' },
  { date: new Date('2023-12-08T10:00:00'), monitor1: 'Monitor8', type: Type.Spinning, monitor2: '' },
  { date: new Date('2023-12-09T13:30:00'), monitor1: 'Monitor9', type: Type.Spinning, monitor2: '' },
  { date: new Date('2023-12-09T17:30:00'), monitor1: 'Monitor1', type: Type.Spinning, monitor2: 'Monitor14' },
  { date: new Date('2023-12-10T10:00:00'), monitor1: 'Monitor7', type: Type.Pillates, monitor2: 'Monitor12' }
];

  Type = Type;

  setStartHour(time: number): void{
    this.currentTime = time.toString();
  }

  getActivitiesForSelectedDate(): Activity[] {
    const requiredTimes = [10, 13, 17];

    let dayActivities = this.activities
        .filter(act => 
            act.date.getDate() === this.selectedDate.getDate() &&
            act.date.getFullYear() === this.selectedDate.getFullYear())
        .sort((a, b) => a.date.getHours() - b.date.getHours());

    requiredTimes.forEach(hour => {
        let minutes = 0;
        if (hour === 13) {
            minutes = 30;
        } else if (hour === 17) {
            minutes = 30;
        }

        if (!dayActivities.some(act => act.date.getHours() === hour && act.date.getMinutes() === minutes)) {
            const placeholderActivity: Activity = {
                date: new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate(), hour, minutes),
                monitor1: '',
                monitor2: '',
                type: Type.Pillates
            };
            dayActivities.push(placeholderActivity);
        }
    });

    return dayActivities.sort((a, b) => a.date.getHours() - b.date.getHours() || a.date.getMinutes() - b.date.getMinutes());
}



  getImagePath(type: Type): string {
    switch(type) {
      case Type.Pillates:
        return "../../assets/img/pillates.svg";
      case Type.Spinning:
        return "../../assets/img/spinning.svg";
      case Type.BodyPump:
        return "../../assets/img/bodypump.svg";
      default:
        return "../../assets/img/default.svg";
    }
}
  currentTime: string = "";
  @Input() selectedDate: Date = new Date();
}

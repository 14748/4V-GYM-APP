import { Component } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import { ActivitiesDisplayComponent } from '../activities-display/activities-display.component';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, MatNativeDateModule, ActivitiesComponent, ActivitiesDisplayComponent],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
    selected: Date = new Date(Date.now());

    getSpanishMonthName(monthNumber: number): string {
      const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      return monthNames[monthNumber];
    }

    addDayToDate(): void {
      if (this.selected) {
        this.selected.setDate(this.selected.getDate() + 1);
      }
    }

    substractDayToDate(): void{
      if (this.selected) {
        this.selected.setDate(this.selected.getDate() - 1);
      }
    }
    
}

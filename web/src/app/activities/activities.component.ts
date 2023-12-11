import { Component } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
    selected: Date | null = null;

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

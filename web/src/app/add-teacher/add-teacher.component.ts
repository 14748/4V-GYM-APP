import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [],
  templateUrl: './add-teacher.component.html',
  styleUrl: './add-teacher.component.css'
})
export class AddTeacherComponent {
  @Output() toggleView = new EventEmitter<void>();
  accept(): void{
    //TODO: use rest api
  }

  cancel(): void{
    this.toggleView.emit();
  }
}

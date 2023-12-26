import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiRequestsService, Teacher } from '../api-requests.service';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-teacher.component.html',
  styleUrl: './add-teacher.component.css'
})
export class AddTeacherComponent {

  Teacher: Teacher = { id: -1, name: '', email: '', phone: '', photo: '' };
  @Output() toggleView = new EventEmitter<void>();

  constructor(private apiRequestsService: ApiRequestsService) {}

  addNewTeacher(newTeacherData: Omit<Teacher, 'id'>) {
    this.apiRequestsService.createTeacher(newTeacherData).subscribe({
      next: (response) => console.log('Teacher created successfully!', response),
      error: (error) => console.error('There was an error creating the teacher', error)
    });
  }
  accept(): void{
    this.addNewTeacher(this.Teacher);
  }

  cancel(): void{
    this.toggleView.emit();
  }
}

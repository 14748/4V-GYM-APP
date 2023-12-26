import { Component } from '@angular/core';
import { AddTeacherComponent } from '../add-teacher/add-teacher.component';
import { ApiRequestsService, Teacher } from '../api-requests.service';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [AddTeacherComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent {

  addTeacher: boolean = false;

  changeTeacherStatus(): void{
    this.addTeacher = !this.addTeacher;
  }

  teachers: Teacher[] = [];

  constructor(private apiRequestsService: ApiRequestsService) {}
  filteredTeachers: Teacher[] = [];
  ngOnInit() {
    this.apiRequestsService.getMonitors().subscribe({
      next: (data) => {
        this.teachers = data;
        this.filteredTeachers = this.teachers.slice(0, 3);
      },
      error: (error) => console.error('There was an error fetching the monitors', error)
    });
  }
  

  shiftTeacherUpwards(): void{
    let nextTeacherIndex: number = this.teachers.indexOf(this.filteredTeachers[this.filteredTeachers.length - 1]) + 1;
    if (nextTeacherIndex > this.filteredTeachers.length) {
      nextTeacherIndex = 0;
    }
    
    let nextTeacher = this.teachers.at(nextTeacherIndex);
    if (nextTeacher) {
      this.filteredTeachers.shift(); 
      this.filteredTeachers.push(nextTeacher);
    }
  }

  shiftTeacherDownwards(): void{
    let prevIndexTeacher: number = this.teachers.indexOf(this.filteredTeachers[0]) - 1;
    if (prevIndexTeacher < 0) {
      prevIndexTeacher = this.teachers.length - 1;
    }

    let prevTeacher = this.teachers.at(prevIndexTeacher);
    if (prevTeacher) {
      this.filteredTeachers.pop()
      this.filteredTeachers.unshift(prevTeacher);
    }
  }
}

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
  editTEacher: Teacher | null = null;
  teachers: Teacher[] = [];
  filteredTeachers: Teacher[] = [];

  constructor(private apiRequestsService: ApiRequestsService) {}

  ngOnInit() {
    this.getTeachers();
    this.apiRequestsService.obs.subscribe(() => this.getTeachers());
  }

  getTeachers(): void{
    this.apiRequestsService.getMonitors()
    .subscribe((data) =>
    {
      this.teachers = data;
      this.filteredTeachers = this.teachers.slice(0, 3);
    });
  }

  changeTeacherStatus(): void{
    this.editTEacher = null;
    this.addTeacher = !this.addTeacher;
  }

  setEditTeacher(teacher: Teacher): void{
    this.editTEacher = teacher;
    this.addTeacher = !this.addTeacher;
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

  removeMonitor(monitorId: number) {
    this.apiRequestsService.deleteMonitor(monitorId).subscribe({
      next: () => {
        console.log(`Monitor with ID ${monitorId} deleted successfully`);
        this.apiRequestsService.notify(null);
      },
      error: (error) => console.error('There was an error deleting the monitor', error)
    });
  }
  

 
}

import { Component } from '@angular/core';

export interface Teacher{
  name: string,
  email: string,
  phoneNumber: string
}

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent {
  teachers: Teacher[] = [
    {
      name: "John Doe",
      email: "johndoe@example.com",
      phoneNumber: "123-456-7890"
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      phoneNumber: "234-567-8901"
    },
    {
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      phoneNumber: "345-678-9012"
    },
    {
      name: "Ricardo aaa",
      email: "alicejohnson@example.com",
      phoneNumber: "345-678-9012"
    },
  ];

  filteredTeachers: Teacher[] = this.teachers.slice(0, 3);

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

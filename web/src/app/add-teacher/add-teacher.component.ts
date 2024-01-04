import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiRequestsService, Teacher } from '../api-requests.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-teacher.component.html',
  styleUrl: './add-teacher.component.css'
})
export class AddTeacherComponent {

  Teacher: Teacher = { id: -1, name: '', email: '', phone: '', photo: '' };
  @Input() editTeacher: Teacher | null = null;
  @Output() toggleView = new EventEmitter<void>();

  constructor(private apiRequestsService: ApiRequestsService, private toastr: ToastrService) {}

  addNewTeacher(newTeacherData: Omit<Teacher, 'id'>) {
    this.apiRequestsService.createTeacher(newTeacherData).subscribe({
      next: () => {
        this.toastr.success('Teacher created successfully');
        this.apiRequestsService.notify(null);
        this.toggleView.emit();
      } ,
      error: (error) => {
        this.toastr.error(error, 'There was an error creating the teacher')
      },
    });
  }

  modifyMonitor(monitorId: number, updatedData: Omit<Teacher, 'id'>) {
    this.apiRequestsService.updateMonitor(monitorId, updatedData).subscribe({
      next: () => {
        this.toastr.success('Monitor updated successfully');
        this.apiRequestsService.notify(null);
        this.toggleView.emit();
      },
      error: (error) => this.toastr.error(error, 'There was an error updating the monitor'),
    });
  }
  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editTeacher'] && this.editTeacher) {
      this.setDefaultValues(this.editTeacher);
    }
  }

  setDefaultValues(teacher: Teacher): void{
    this.Teacher = teacher;
  }

  accept(): void{
    if (this.editTeacher) {
      this.modifyMonitor(this.editTeacher.id, this.Teacher);
    }else{
      this.addNewTeacher(this.Teacher);
    }
  }

  cancel(): void{
    this.toggleView.emit();
  }
}

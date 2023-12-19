import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-activity',
  standalone: true,
  imports: [],
  templateUrl: './add-activity.component.html',
  styleUrl: './add-activity.component.css'
})
export class AddActivityComponent {
  @Output() toggleView = new EventEmitter<void>();
  accept(): void{
    //TODO: use rest api
  }

  cancel(): void{
    this.toggleView.emit();
  }
}

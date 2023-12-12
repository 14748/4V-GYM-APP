import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Output() toggleView = new EventEmitter<boolean>();
  @Input() onActivities: Boolean = new Boolean();
  emitToggleView(value: boolean) {
    this.toggleView.emit(value);
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesDisplayComponent } from './activities-display.component';

describe('ActivitiesDisplayComponent', () => {
  let component: ActivitiesDisplayComponent;
  let fixture: ComponentFixture<ActivitiesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitiesDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivitiesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

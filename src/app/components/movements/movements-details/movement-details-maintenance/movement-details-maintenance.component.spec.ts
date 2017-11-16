import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementDetailsMaintenanceComponent } from './movement-details-maintenance.component';

describe('MovementDetailsMaintenanceComponent', () => {
  let component: MovementDetailsMaintenanceComponent;
  let fixture: ComponentFixture<MovementDetailsMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementDetailsMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementDetailsMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

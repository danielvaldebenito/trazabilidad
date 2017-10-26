import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsDetailsTruckloadComponent } from './movements-details-truckload.component';

describe('MovementsDetailsTruckloadComponent', () => {
  let component: MovementsDetailsTruckloadComponent;
  let fixture: ComponentFixture<MovementsDetailsTruckloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementsDetailsTruckloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsDetailsTruckloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

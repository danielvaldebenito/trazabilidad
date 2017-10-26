import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsDetailsStationComponent } from './movements-details-station.component';

describe('MovementsDetailsStationComponent', () => {
  let component: MovementsDetailsStationComponent;
  let fixture: ComponentFixture<MovementsDetailsStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementsDetailsStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsDetailsStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

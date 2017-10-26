import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsDetailsSaleComponent } from './movements-details-sale.component';

describe('MovementsDetailsSaleComponent', () => {
  let component: MovementsDetailsSaleComponent;
  let fixture: ComponentFixture<MovementsDetailsSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementsDetailsSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsDetailsSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

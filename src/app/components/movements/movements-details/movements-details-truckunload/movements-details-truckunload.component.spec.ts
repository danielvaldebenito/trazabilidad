import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsDetailsTruckunloadComponent } from './movements-details-truckunload.component';

describe('MovementsDetailsTruckunloadComponent', () => {
  let component: MovementsDetailsTruckunloadComponent;
  let fixture: ComponentFixture<MovementsDetailsTruckunloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementsDetailsTruckunloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsDetailsTruckunloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

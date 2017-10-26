import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsDetailsComponent } from './movements-details.component';

describe('MovementsDetailsComponent', () => {
  let component: MovementsDetailsComponent;
  let fixture: ComponentFixture<MovementsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

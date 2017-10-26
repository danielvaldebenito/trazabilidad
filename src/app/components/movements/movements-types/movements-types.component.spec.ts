import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsTypesComponent } from './movements-types.component';

describe('MovementsTypesComponent', () => {
  let component: MovementsTypesComponent;
  let fixture: ComponentFixture<MovementsTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementsTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

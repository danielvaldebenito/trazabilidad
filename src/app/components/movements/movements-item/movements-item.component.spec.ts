import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsItemComponent } from './movements-item.component';

describe('MovementsItemComponent', () => {
  let component: MovementsItemComponent;
  let fixture: ComponentFixture<MovementsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

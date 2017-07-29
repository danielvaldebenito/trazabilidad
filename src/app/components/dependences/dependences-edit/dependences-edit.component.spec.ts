import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencesEditComponent } from './dependences-edit.component';

describe('DependencesEditComponent', () => {
  let component: DependencesEditComponent;
  let fixture: ComponentFixture<DependencesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependencesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

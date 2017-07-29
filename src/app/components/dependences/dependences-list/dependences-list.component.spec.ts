import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencesListComponent } from './dependences-list.component';

describe('DependencesListComponent', () => {
  let component: DependencesListComponent;
  let fixture: ComponentFixture<DependencesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependencesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencesComponent } from './dependences.component';

describe('DependencesComponent', () => {
  let component: DependencesComponent;
  let fixture: ComponentFixture<DependencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

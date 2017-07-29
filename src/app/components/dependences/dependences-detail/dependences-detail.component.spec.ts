import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencesDetailComponent } from './dependences-detail.component';

describe('DependencesDetailComponent', () => {
  let component: DependencesDetailComponent;
  let fixture: ComponentFixture<DependencesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependencesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

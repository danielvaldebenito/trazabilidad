import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencesNewComponent } from './dependences-new.component';

describe('DependencesNewComponent', () => {
  let component: DependencesNewComponent;
  let fixture: ComponentFixture<DependencesNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependencesNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

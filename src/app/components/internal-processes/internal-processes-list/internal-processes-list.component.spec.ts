import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalProcessesListComponent } from './internal-processes-list.component';

describe('InternalProcessesListComponent', () => {
  let component: InternalProcessesListComponent;
  let fixture: ComponentFixture<InternalProcessesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalProcessesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalProcessesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

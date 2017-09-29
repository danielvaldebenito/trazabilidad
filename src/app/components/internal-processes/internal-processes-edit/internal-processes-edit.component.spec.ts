import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalProcessesEditComponent } from './internal-processes-edit.component';

describe('InternalProcessesEditComponent', () => {
  let component: InternalProcessesEditComponent;
  let fixture: ComponentFixture<InternalProcessesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalProcessesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalProcessesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

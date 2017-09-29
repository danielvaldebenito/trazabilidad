import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalProcessesComponent } from './internal-processes.component';

describe('InternalProcessesComponent', () => {
  let component: InternalProcessesComponent;
  let fixture: ComponentFixture<InternalProcessesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalProcessesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

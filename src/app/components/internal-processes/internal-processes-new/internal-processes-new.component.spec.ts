import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalProcessesNewComponent } from './internal-processes-new.component';

describe('InternalProcessesNewComponent', () => {
  let component: InternalProcessesNewComponent;
  let fixture: ComponentFixture<InternalProcessesNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalProcessesNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalProcessesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

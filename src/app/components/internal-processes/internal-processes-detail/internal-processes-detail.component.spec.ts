import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalProcessesDetailComponent } from './internal-processes-detail.component';

describe('InternalProcessesDetailComponent', () => {
  let component: InternalProcessesDetailComponent;
  let fixture: ComponentFixture<InternalProcessesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalProcessesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalProcessesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

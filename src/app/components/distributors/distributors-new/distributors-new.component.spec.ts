import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorsNewComponent } from './distributors-new.component';

describe('DistributorsNewComponent', () => {
  let component: DistributorsNewComponent;
  let fixture: ComponentFixture<DistributorsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

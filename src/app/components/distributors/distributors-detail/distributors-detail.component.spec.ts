import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorsDetailComponent } from './distributors-detail.component';

describe('DistributorsDetailComponent', () => {
  let component: DistributorsDetailComponent;
  let fixture: ComponentFixture<DistributorsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

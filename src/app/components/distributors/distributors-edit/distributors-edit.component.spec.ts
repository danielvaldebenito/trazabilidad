import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorsEditComponent } from './distributors-edit.component';

describe('DistributorsEditComponent', () => {
  let component: DistributorsEditComponent;
  let fixture: ComponentFixture<DistributorsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

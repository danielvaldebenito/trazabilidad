import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsDetailsTransferComponent } from './movements-details-transfer.component';

describe('MovementsDetailsTransferComponent', () => {
  let component: MovementsDetailsTransferComponent;
  let fixture: ComponentFixture<MovementsDetailsTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementsDetailsTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsDetailsTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

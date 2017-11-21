import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMonitorListComponent } from './order-monitor-list.component';

describe('OrderMonitorListComponent', () => {
  let component: OrderMonitorListComponent;
  let fixture: ComponentFixture<OrderMonitorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMonitorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMonitorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMonitorComponent } from './order-monitor.component';

describe('OrderMonitorComponent', () => {
  let component: OrderMonitorComponent;
  let fixture: ComponentFixture<OrderMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

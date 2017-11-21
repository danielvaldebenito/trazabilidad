import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMonitorItemComponent } from './order-monitor-item.component';

describe('OrderMonitorItemComponent', () => {
  let component: OrderMonitorItemComponent;
  let fixture: ComponentFixture<OrderMonitorItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMonitorItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMonitorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

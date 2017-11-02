import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockWarehousesComponent } from './stock-warehouses.component';

describe('StockWarehousesComponent', () => {
  let component: StockWarehousesComponent;
  let fixture: ComponentFixture<StockWarehousesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockWarehousesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockWarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

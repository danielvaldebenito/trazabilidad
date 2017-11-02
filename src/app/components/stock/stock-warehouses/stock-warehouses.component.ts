import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { StockService } from '../../../services/stock.service'
import * as Enumerable from 'linq'
@Component({
  selector: 'app-stock-warehouses',
  templateUrl: './stock-warehouses.component.html',
  styleUrls: ['./stock-warehouses.component.css']
})
export class StockWarehousesComponent implements OnInit, OnChanges {

  @Input() warehouses: any[]
  classified: any[] = [];
  selected: any; // type
  selectedWh: any; // warehouse
  products: any[];
  @Input() selectedWarehouse: any
  @Input() selectedType: any
  @Input() selectedNif: any
  constructor(
    private _stockService: StockService
  ) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    const self = this
    setTimeout(function () {
      if (changes.selectedType) {
        if(changes.selectedType.currentValue) {
          self.selected = { type: changes.selectedType.currentValue };
        } else {
          self.selected = null
        }
      }
      setTimeout(function() {
        if (changes.selectedWarehouse) {
          if(changes.selectedWarehouse.currentValue) {
            self.selectedWh = { _id: changes.selectedWarehouse.currentValue };
            self.getStockWarehouse();
          } else {
            self.selectedWh = null;
          }
        }
      }, 100);
    }, 200);

  }
  classify() {
    this.warehouses.forEach(warehouse => {
      const existsType = Enumerable.from(this.classified)
        .where((w) => { return w.type == warehouse.type })
        .firstOrDefault()
      if (existsType) {
        existsType.warehouses.push(warehouse)
      } else {
        let type = {
          type: warehouse.type,
          warehouses: [warehouse]
        }
        this.classified.push(type);
      }
    });
  }
  ngOnInit() {
    this.classify();
  }
  toggleType(type) {
    this.selected = this.selected == type ? null : type;
  }
  toggleWarehouse(warehouse) {
    this.selectedWh = this.selectedWh == warehouse ? null : warehouse;
    if (this.selectedWh)
      this.getStockWarehouse();
  }

  getStockWarehouse() {
    this._stockService.getStockWarehouse(this.selectedWh._id)
      .subscribe(res => {
        if (res.done) {
          this.products = res.data;
        }
      }, error => {
        console.log(error)
      })
  }
}

import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { DependencesService } from '../../../services/dependences.service'
@Component({
  selector: 'app-stock-dependences',
  templateUrl: './stock-dependences.component.html',
  styleUrls: ['./stock-dependences.component.css']
})
export class StockDependencesComponent implements OnInit, OnChanges {
  
  @Input() dependences: any[]
  @Input() selectedDependence: any
  @Input() selectedType: any
  @Input() selectedWarehouse: any
  @Input() selectedNif: any
  @Input() loadingExcel: boolean
  @Output() exporting = new EventEmitter<any>();
  @Output() exportingResume = new EventEmitter<any>();
  selected: any
  constructor(
    private _dependencesService: DependencesService,
    private _stockService: StockService
  ) { 
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)
    if(changes.selectedDependence) {
      if(changes.selectedDependence.currentValue) {
        this.selected = { _id: changes.selectedDependence.currentValue }
        if(this.selected)
          this.getWarehouses(); 
      } else {
        this.selected = null;
      }
      
    }
    // if(changes.loadingExcel) {
    //   if(changes.loadingExcel.currentValue == true)
    //     this.loadingExcel = changes.loadingExcel.currentValue
    // }
  }

  ngOnInit() {
    
  }
  toggleDependence(dependence) {
    this.selected = this.selected == dependence ? null : dependence;
    if(this.selected) {
      this.getWarehouses();
    }
  }
  getWarehouses () {
    this._dependencesService.getWarehousesOfOne(this.selected._id)
      .subscribe(res => {
        if(res.done) {
          this.selected.warehouses = res.warehouses;
        }
      }, 
      error => console.log(error))
  }

  exportDependence(dependence) {
    this.exporting.emit({ dependence: dependence._id, dependenceName: dependence.name })
  }
  exportResumeDependence(dependence) {
    this.exportingResume.emit({ dependence: dependence._id, dependenceName: dependence.name });
  }
  exportWarehouseType(type) {
    this.exporting.emit({ dependence: this.selected._id, dependenceName: this.selected.name, warehouseType: type })
  }
  exportResumeWarehouseType(type) {
    this.exportingResume.emit({ dependence: this.selected._id, dependenceName: this.selected.name, warehouseType: type })
  }
  exportWarehouse(data) {
    this.exporting.emit({ dependence: this.selected._id, dependenceName: this.selected.name, warehouseType: data.type, warehouse: data.warehouse._id, warehouseName: data.warehouse.name })
  }
  exportResumeWarehouse(data) {
    this.exportingResume.emit({ dependence: this.selected._id, dependenceName: this.selected.name, warehouseType: data.type, warehouse: data.warehouse._id, warehouseName: data.warehouse.name })
  }
}

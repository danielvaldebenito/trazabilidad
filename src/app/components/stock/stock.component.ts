import { Component, OnInit } from '@angular/core';
import { DependencesService } from '../../services/dependences.service'
import { StockService } from '../../services/stock.service'
import { ProductsService } from '../../services/products.service'
import { SweetAlertService } from 'ngx-sweetalert2'
import { GLOBAL } from '../../global'
import { saveAs } from 'file-saver/FileSaver';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  filter: string
  selectedDependence: any
  selectedWarehouse: any
  selectedType: any
  selectedNif: any
  loadingExcel:boolean = false
  loading: boolean = false
  constructor(
    private _dependencesService: DependencesService,
    private _stockService: StockService,
    private _productsService: ProductsService,
    private _swal2: SweetAlertService
  ) { }
  dependences: any[]
  ngOnInit() {
    this.getDependences();
  }

  getDependences() {
    this._dependencesService.getDependences('', 200, 1)
      .subscribe(res => {
        if(res.done) {
          this.dependences = res.data
        }
      }, error => {
        console.log(error)
      })
  }
  onSubmitFilter() {
    this.loading = true
    this._productsService.get(this.filter)
    .subscribe(res => {
      if(res.done) {
        const stock = res.data.stock;
        const warehouse = stock.warehouse._id
        const type = stock.warehouse.type
        const dependence = stock.warehouse.dependence._id
        this.selectedDependence = dependence
        this.selectedType = type
        this.selectedWarehouse = warehouse
        this.selectedNif = res.data.product.formatted || res.data.product.nif
      } else {
        this.selectedDependence = null
        this.selectedType = null
        this.selectedWarehouse = null
        this.selectedNif = null
        this._swal2.error({
          text: res.message
        })
      }
      this.loading = false
    }, error => {
      this.selectedDependence = null
      this.selectedType = null
      this.selectedWarehouse = null
      this.selectedNif = null
      this._swal2.error({
        text: 'Producto no encontrado'
      })
      this.loading = false
    })
  }

  export(data) {
    const dependence = data && data.dependence
    const warehouseType = data && data.warehouseType
    const warehouse = data && data.warehouse
    this.loadingExcel = true;
    this._stockService.exportToExcel(dependence, warehouseType, warehouse)
      .subscribe(res => {
        this.loadingExcel = false;
        //this.loadindExcel = false;
      }, error => {
        console.log(error)
        this.loadingExcel = false;
      })
  }


}

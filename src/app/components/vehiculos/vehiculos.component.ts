import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VehicleService } from '../../services/vehicles.service';
import { SelectsService } from '../../services/selects.service';
import { Vehicle } from '../../models/vehicle.model';
import { PagerService } from '../../services/pager.service';
import { SweetAlertService } from 'ngx-sweetalert2'
import * as _ from 'underscore';
@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css'],
  providers: [SweetAlertService]
})
export class VehiculosComponent implements OnInit {
  // array of all items to be paged
  private allItems: any[];
  currentPage: number = 1;
  total: number = 0;
  limit: number = 4;
  filter: string = '';
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  @Input() fromModal: boolean;
  @Output() selected = new EventEmitter<any>();
  constructor(
    private _vehicleService: VehicleService, 
    private _pagerService: PagerService,
    private _swal2: SweetAlertService
  ) 
  { }

  ngOnInit() {
    this.refresh();
    
  }
  onSelect(vehicle) {
    this.selected.emit(vehicle);
  }
  getVehicles(filter: string, limit: number){
    this._vehicleService
        .getVehicles(filter, limit, this.currentPage)
        .subscribe(
          res => {
            if(res.done){
              this.allItems = res.data;
              this.total = res.total;
              this.pager = this._pagerService.getPager(this.total, this.currentPage, limit);
            }
          },
          error => console.log(error))
  }
  setPage(page: number) {
      this.currentPage = page;
      this.refresh();
  }
  onKey (value: string) {
    this.filter = value;
    this.refresh();
  }
  tryDelete (id) {
    this._swal2.confirm({ 
      title: 'Eliminar registro', 
      text: '¿Está seguro que desea eliminar este vehículo?',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true
     })
    .then(
      res => {console.log(res); this.deleteRecord(id);},
      cancel => { console.log(cancel) }
    );
  }
  deleteRecord (id) {
    this._vehicleService.deleteVehicle(id)
      .subscribe(res => {
        if(res.done){
          this.refresh();
          this._swal2.success({ 
            title: 'Registro eliminado', 
            text: res.message,
            confirmButtonText: 'OK'
          })
        }
        
      }, e => console.log(e))
  }
  
  refresh() {
    this.getVehicles(this.filter, this.limit);
  }
}

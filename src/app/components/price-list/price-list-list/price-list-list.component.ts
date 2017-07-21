import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SweetAlertService } from 'ng-sweetalert2-slc';
import { Location } from '@angular/common';
import { PriceListService } from '../../../services/price-list.service';
@Component({
  selector: 'app-price-list-list',
  templateUrl: './price-list-list.component.html',
  styleUrls: ['./price-list-list.component.css']
})
export class PriceListListComponent implements OnInit {
  @Input() priceLists : any [];
  @Output() onDeletePriceList = new EventEmitter();
  constructor(
    private _swal2: SweetAlertService,
    private _location: Location,
    private _plService: PriceListService
  ) { }

  ngOnInit() {
  }

  tryDelete (id) {
    this._swal2.confirm({ 
      title: 'Eliminar registro', 
      text: '¿Está seguro que desea eliminar esta lista de precios?',
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
    this._plService.deletePriceList(id)
      .subscribe(res => {
        if(res.done){
          this.onDeletePriceList.emit();
          this._swal2.success({ 
            title: 'Registro eliminado', 
            text: res.message,
            confirmButtonText: 'OK'
          })
          .then(res => console.log(res))
        }
        
      }, e => console.log(e))
  }
}

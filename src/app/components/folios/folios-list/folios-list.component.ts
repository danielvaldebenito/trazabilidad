import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FoliosService } from '../../../services/folios.service'
import { SweetAlertService } from 'ngx-sweetalert2'
@Component({
  selector: 'app-folios-list',
  templateUrl: './folios-list.component.html',
  styleUrls: ['./folios-list.component.css'],
  providers: [SweetAlertService]
})
export class FoliosListComponent implements OnInit {
  @Input() folios: any[]
  @Output() onDeleteOne = new EventEmitter ()
  constructor(
    private _foliosService: FoliosService,
    private _swal2 : SweetAlertService
  ) { }

  ngOnInit() {
  }
  tryDelete (id) {
    this._swal2.confirm({ 
      title: 'Eliminar registro', 
      text: '¿Está seguro que desea eliminar este rango de folios?',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true
     })
    .then(
      res => { this.deleteRecord(id);},
      cancel => { console.log(cancel) }
    );
  }
  deleteRecord (id) {
    this._foliosService.deleteFolio(id)
      .subscribe(res => {
        if(res.done){
          this.onDeleteOne.emit();
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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { SweetAlertService } from 'ngx-sweetalert2'
import { Location } from '@angular/common'
import { DependencesService } from '../../../services/dependences.service'

@Component({
  selector: 'app-dependences-list',
  templateUrl: './dependences-list.component.html',
  styleUrls: ['./dependences-list.component.css'],
  providers: [SweetAlertService]
})
export class DependencesListComponent implements OnInit {
  @Input() dependences: any[]
  @Output() deletedItem = new EventEmitter()
  constructor(
    private _swal2: SweetAlertService,
    private _location: Location,
    private _dependenceService: DependencesService
  ) { }

  ngOnInit() {
  }
  tryDelete (id) {
    this._swal2.confirm({ 
      title: 'Eliminar registro', 
      text: '¿Está seguro que desea eliminar esta dependencia?',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true
     })
    .then(
      res => {
        this.deleteRecord(id)
      },
      cancel => { console.log(cancel) }
    )
  }
  deleteRecord (id) {
    this._dependenceService.deleteDependence(id)
      .subscribe(res => {
        if(res.done){
          this.deletedItem.emit()
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

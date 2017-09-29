import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SweetAlertService } from 'ngx-sweetalert2'
@Component({
  selector: 'app-internal-processes-list',
  templateUrl: './internal-processes-list.component.html',
  styleUrls: ['./internal-processes-list.component.css']
})
export class InternalProcessesListComponent implements OnInit {

  @Input() internalProcesses: any[]
  @Input() fromModal: boolean;
  @Output() deleted = new EventEmitter<any>();
  constructor(
    private _swal2: SweetAlertService
  ) { }

  ngOnInit() {
  }

  tryDelete(ip) {
    this._swal2.confirm({
      title: '¿Está seguro?',
      text: '¿Realmente desea eliminar este registro?',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(yes => this.deleted.emit(ip), no => {})
    
  }
  
}

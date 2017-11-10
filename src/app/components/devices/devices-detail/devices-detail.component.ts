import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SweetAlertService} from 'ngx-sweetalert2'
import { DevicesService } from '../../../services/devices.service'
@Component({
  selector: 'app-devices-detail',
  templateUrl: './devices-detail.component.html',
  styleUrls: ['./devices-detail.component.css']
})
export class DevicesDetailComponent implements OnInit {

  @Input() device: any
  @Output() deleted = new EventEmitter();
  selected = false
  constructor(
    private _devicesService: DevicesService,
    private _swal2: SweetAlertService
  ) { }

  ngOnInit() {
  }
  setPos(device) {
    this._devicesService.setPos(device, this.device.pos)
      .subscribe(res => {
        if(res.done) {
          this._swal2.success({
            text: res.message
          })
          this.selected = false
        } else {
          this._swal2.error({
            text: res.message
          })
        }
      }, error => {
        this._swal2.error({
          text: 'Ha ocurrido un error. Inténtalo más tarde'
        })
      })
  }

  tryDelete() {
    this._swal2.confirm({
      title: 'Eliminar Dispositivo',
      text: '¿Está seguro de eliminar este dispositivo?',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    })
    .then(
      yes => {
        this.delete();
      },
      no => {

      }
    )
  }
  delete() {
    this._devicesService.delete(this.device._id)
        .subscribe(res => {
          if(res.done) {
            this.deleted.emit()
            this._swal2.success({
              title: 'Eliminado',
              text: res.message
            })
          } else {
            this._swal2.error({
              title: 'Error',
              text: res.message
            })
          }
        }, error => {
          this._swal2.error({
            title: 'Error',
            text: error
          })
        })
  }
}

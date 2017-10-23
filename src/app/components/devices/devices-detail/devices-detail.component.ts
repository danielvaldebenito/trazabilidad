import { Component, OnInit, Input } from '@angular/core';
import { SweetAlertService} from 'ngx-sweetalert2'
import { DevicesService } from '../../../services/devices.service'
@Component({
  selector: 'app-devices-detail',
  templateUrl: './devices-detail.component.html',
  styleUrls: ['./devices-detail.component.css']
})
export class DevicesDetailComponent implements OnInit {

  @Input() device: any
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

}

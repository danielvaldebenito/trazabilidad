import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../../services/devices.service';
import { PagerService } from '../../services/pager.service'
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  devices: any[]
  filter: string
  limit: number
  currentPage = 1
  pager: any = {}
  
  constructor(
    private _devicesService: DevicesService,
    private _pagerService: PagerService
  ) { }

  ngOnInit() {
    this.getDevices();
  }

  getDevices() {
    this._devicesService.get(this.filter, this.limit, this.currentPage)
      .subscribe(res => {
        console.log(res)
        if(res.done) {
          this.devices = res.data
          this.pager = this._pagerService.getPager(res.total, this.currentPage, this.limit)
        } 
      }, error => console.log(error))
  }
  refresh() {
    this.getDevices();
  }
  setPage(page){
    this.currentPage = page
    this.refresh()
  }
}

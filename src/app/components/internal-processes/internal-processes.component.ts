import { Component, OnInit } from '@angular/core';
import { InternalProcessesService } from '../../services/internal-processes.service'
import { PagerService } from '../../services/pager.service'
import { SweetAlertService } from 'ngx-sweetalert2'
@Component({
  selector: 'app-internal-processes',
  templateUrl: './internal-processes.component.html',
  styleUrls: ['./internal-processes.component.css']
})
export class InternalProcessesComponent implements OnInit {

  internalProcesses: any[]
  filter: string
  limit = 20
  page = 1
  sidx = '_id'
  sord = 1
  pager: any = {}
  constructor(
    private _internalProcessService: InternalProcessesService,
    private _pagerService: PagerService,
    private _swal2: SweetAlertService
  ) { }

  ngOnInit() {
    this.getInternalProcesses();
  }

  getInternalProcesses () {
    this._internalProcessService.get(this.filter, this.sidx, this.sord, this.page, this.limit)
      .subscribe(res => {
        if(res.done) {
          this.internalProcesses = res.data;
          this.pager = this._pagerService.getPager(res.total, this.page, this.limit)
        }
      }, error => {
        console.log(error)
        
      })
  }

  setPage(page:number) {
    this.page = page; 
    this.getInternalProcesses();
  }
  onKey() {
    this.getInternalProcesses();
  }
  onDelete(ip: any) {
    this._internalProcessService.delete(ip._id)
      .subscribe(res => {
        if(res.done) {
          this._swal2.success({
            title: 'Eliminado',
            text: res.message
          })
          this.getInternalProcesses();
        }
      }, error => {
        this._swal2.error({
          text: 'Ha ocurrido un error, inténtelo más tarde'
        })
      })
  } 
}


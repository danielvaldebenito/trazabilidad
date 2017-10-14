import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClientsService } from '../../services/clients.service'
import { PagerService } from '../../services/pager.service'
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any[]
  filter: string = ''
  limit: number = 20
  currentPage: number = 1
  pager: any = {}
  @Input () fromModal: boolean = false
  @Output () selected = new EventEmitter<any> ()
  constructor(
    private _clientsService: ClientsService,
    private _pagerService: PagerService
  ) { }

  ngOnInit() {
    this.getClients()
  }
  onKey() {
    this.getClients ()
  }
  setPage(page) {
    this.currentPage = page
    this.getClients()
  }
  getClients () {
    this._clientsService.getClients(this.filter, this.limit, this.currentPage)
        .subscribe(res => {
          if(res.done){
            this.clients = res.data
            this.pager = this._pagerService.getPager(res.total, this.currentPage, this.limit)
            console.log(this.pager)
          }
        }, err => {
          console.log(err)
        })
  }
  onSelect (client) {
    this.selected.emit(client)
  }
  refresh() {
    this.getClients();
  }
}

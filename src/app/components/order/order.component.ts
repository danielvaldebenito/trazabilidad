import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { PagerService } from '../../services/pager.service';
import { ConfirmationComponent, ConfirmationService } from '@jaspero/ng2-confirmations'
import { ResolveEmit } from "@jaspero/ng2-confirmations/src/interfaces/resolve-emit";
import * as moment from 'moment'
moment.locale('es')
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  innerWidth: number;
  private allItems: any[];
  currentPage: number = 1;
  totalItems: number = 0;
  limit: number = 10;
  selectedState: string = 'RECIBIDO';
  filter: string;
  pager: any = {};
  pagedItems: any[];
  momentValue: any = moment().format('YYYY-MM-DD');
  formatDate: any;
  sidx: string = 'destinyWarehouse.name';
  sord: number = 1;
  view: any[] = [800, 200];
  colorScheme = {
    domain: ['#F44336', '#FFEB3B', '#00C853', '#0091EA', '#000000']
  };
  single = [
  {
    "name": 'RECIBIDO',
    "value": 1
  },
  {
    "name": 'ASIGNADO',
    "value": 2
  },
  {
    "name": 'EN RUTA',
    "value": 4
  },
  {
    "name": 'ENTREGADO',
    "value": 8
  },
  {
    "name": 'CANCELADO',
    "value": 3
  }
];
  constructor(
    private _orderService : OrderService,
    private _pagerService: PagerService,
    private _cdr: ChangeDetectorRef
  ) {

    let getWindow = () => { return window.innerWidth }
    window.onresize = () => {
      
      this._cdr.detectChanges();
      this.OnResize();
    }
    
    this.OnResize();
  }
  
  OnResize() {
    this.innerWidth = window.innerWidth;
      if(this.innerWidth < 700)
        this.view = [this.innerWidth - 50, this.innerWidth / 2]
      else
        this.view = [700,200]
  }
  ngOnInit() {
    this.refresh();
  }
  setPage(page: number) {
      this.currentPage = page;
      this.refresh();
  }
  
  onSelect(event) {
    this.selectedState = event.name;
    this.refresh();
  }
  onKey (value: string) {
    this.filter = value;
    this.refresh();
  }
  setMoment(date: any): any {
    this.momentValue = moment(date).format('YYYY-MM-DD');
    this.refresh();
  }
  setSidxSord(sidx: string) {
    this.sidx = sidx;
    this.sord = this.sord * -1;
    this.refresh();
  }
  
  refresh() {
    this.getOrders(this.selectedState, this.filter, this.momentValue, this.limit, this.currentPage, this.sidx, this.sord);
  }

  getOrders (selectedState, filter, date, limit, currentPage, sidx, sord)
  {
    this._orderService
        .getOrders(
          selectedState, 
          filter,
          date,
          limit, 
          currentPage,
          sidx,
          sord
        )
        .subscribe(
          res => {
            if(res.done){
              this.allItems = res.data;
              this.totalItems = res.total;
              this.pager = this._pagerService.getPager(res.total, this.currentPage, this.limit);
              console.log('pager', this.pager)
            }
          },
          error => console.log(error))
  }
}

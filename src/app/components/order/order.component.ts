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
  colors: string[] = ['#d9534f', '#FFEB3B', '#03A9F4', '#5cb85c', '#37424A'];
  colorScheme = {
    domain: []
  };
  single = [];

  constructor(
    private _orderService : OrderService,
    private _pagerService: PagerService,
    private _cdr: ChangeDetectorRef
  ) {
    window.onresize = () => {
      this._cdr.detectChanges();
      this.OnResize();
    }
    this.OnResize();
  }
  getResume () {
    this._orderService.getResume (this.momentValue)
        .subscribe(
          res => {
            if (res.done) {
              this.single = []
              var data = res.data;
              data.forEach((element, i) => {
                this.single.push({ name: element._id, value: element.count })
                this.colorScheme.domain.push(this.colors[i])
              });
              console.log(this.single)
            }
           },
          error => { console.log(error) }
        )
  }
  OnResize() {
    this.innerWidth = window.innerWidth;
    var standarW = 700;
    var standarH = 200;
    var proportion = 700 / 200;
    var max = 1366;
    console.log('width', this.innerWidth);
    if(this.innerWidth < max && this.innerWidth > 992)
    {
      var w = (this.innerWidth * standarW / max) - 30;
      var h = (w * standarH / standarW) + 30;
      this.view = [w, h]
    }
    else if (this.innerWidth < standarW){
      var w = (this.innerWidth) - 50;
      var h = standarH;
      this.view = [w, h]
    }
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
    console.log(event)
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
    this.getResume();
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

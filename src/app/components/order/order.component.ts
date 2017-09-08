import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { SelectsService } from '../../services/selects.service';
import { PagerService } from '../../services/pager.service';
import * as moment from 'moment'
import * as Enumerable from 'linq'
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
  bgcolors: string[] = ['#d9534f', '#FFF176', '#03A9F4', '#5cb85c', '#37424A'];
  colors: string[]  = ['#FFFFFF', '#37424A', '#FFFFFF','#FFFFFF','#FFFFFF']
  states: any[]
  resume = [];

  constructor(
    private _orderService : OrderService,
    private _pagerService: PagerService,
    private _selectsService: SelectsService
  ) {

    this.getStates()
  }
  getStates () {
    this._selectsService.getOrderStates()
        .subscribe(
          res => { 
            if(res.done) {
              res.data.forEach((element, i) => {
                this.resume.push({ 
                  state: element, 
                  value: 0,
                  bgcolor: this.bgcolors[i],
                  color: this.colors[i]
                })
              });
              this.refresh()
            }
          },
          error => {}
        )
  }
  getResume () {
    this._orderService.getResume (this.momentValue)
        .subscribe(
          res => {
            if (res.done) {
              var data = res.data;
              data.forEach(element => {
                this.resume.forEach(r => {
                  if(element._id == r.state) {
                    r.value = element.count
                  }
                })
              });
            }
           },
          error => { console.log(error) }
        )
  }

  ngOnInit() {
    
  }
  setPage(page: number) {
      this.currentPage = page;
      this.refresh();
  }
  
  onSelect(event) {
    this.selectedState = event.state;
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
  
  
  refresh() {
    this.getResume();
    this.getOrders();
  }
  onSort(event) {
    this.sidx = event
    this.sord = this.sord * -1
    this.getOrders()
  }
  getOrders ()
  {
    this._orderService
        .getOrders(
          this.selectedState, this.filter, this.momentValue, this.limit, this.currentPage, this.sidx, this.sord
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
  onCancelOrder(id) {
    this.refresh();
  }
}

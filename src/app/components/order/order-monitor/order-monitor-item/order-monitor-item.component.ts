import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PagerService } from '../../../../services/pager.service'
import { OrderService } from '../../../../services/order.service'
@Component({
  selector: 'app-order-monitor-item',
  templateUrl: './order-monitor-item.component.html',
  styleUrls: ['./order-monitor-item.component.css']
})
export class OrderMonitorItemComponent implements OnInit {
  @Input() da: any;
  @Input() type: string;
  @Input() filter: string
  @Input() selectedRange: any
  @Input() distributor: any
  orderSelected: any
  pager: any = {}
  currentPage: number = 1
  limit: number = 10

  constructor(
    private _modalService: NgbModal,
    private _pagerService: PagerService,
    private _orderService: OrderService
  ) {
    
   }

  ngOnInit() {
    this.pager = this._pagerService.getPager(this.da.total, this.currentPage, this.limit)
    
  }
  open(content, order, size) {
    this.orderSelected = order;
    console.log('order selected', this.orderSelected)
    this._modalService.open(content, { size: size || 'sm' })
        .result.then((result) => {
          //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
  }

  getOrders () {
    let id: string = this.type == 'vehicle' ? this.da._id._id : this.da._id
    this._orderService.getOthersPages(id, this.type, this.selectedRange.from, this.selectedRange.to, this.filter, this.currentPage, this.limit )
      .subscribe(res => {
        if(res.done) {
          this.da.orders = res.orders;
          this.pager = this._pagerService.getPager(res.total, this.currentPage, this.limit);
        }
      }, rej => {
        console.log('error', rej)
      })
  }
  setPage(page) {
    this.currentPage = page;
    this.getOrders();
  }
}

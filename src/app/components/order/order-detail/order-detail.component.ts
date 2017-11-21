import { Component, OnInit, Input } from '@angular/core';
import { GLOBAL } from '../../../global'
import { OrderService } from '../../../services/order.service'
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  @Input() order: any;
  // @Input() orderId: any;
  cityName = GLOBAL.cityName
  regionName = GLOBAL.regionName
  constructor(
    private _orderService: OrderService
  ) { }

  ngOnInit() {
    // if(this.orderId) {
    //   this.get()
    // }
  }
  // get() {
  //   this._orderService.getOne(this.orderId)
  //       .subscribe(res => {
  //         console.log(res)
  //         if(res.done) {
  //           this.order = res.stored
  //         }
  //       })

  // }
}

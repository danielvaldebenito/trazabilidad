import { Component, OnInit, Input } from '@angular/core';
import { SaleService } from '../../../services/sale.service'
import { GLOBAL } from '../../../global'
@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css']
})
export class SaleDetailComponent implements OnInit {

  @Input() orderId: string
  delivery: any = {}
  sale: any = {}
  order: any = {}
  cityName = GLOBAL.cityName
  regionName = GLOBAL.regionName
  constructor(
    private _saleService: SaleService
  ) { }

  ngOnInit() {
    this.getOrderAndSale(this.orderId)
      
  }

  getOrderAndSale (id) {
    this._saleService.getOrderAndSale(id)
      .subscribe(res => {
        console.log(res)
        if(res.done) {
          this.delivery = res.delivery
          this.order = res.order
          this.sale = res.sale
        }
      }, error => console.log(error))
  }

}

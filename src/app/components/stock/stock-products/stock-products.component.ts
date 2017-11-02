import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stock-products',
  templateUrl: './stock-products.component.html',
  styleUrls: ['./stock-products.component.css']
})
export class StockProductsComponent implements OnInit {
  @Input() products: any[]
  @Input() selectedNif: any
  constructor() { }

  ngOnInit() {
  }

}

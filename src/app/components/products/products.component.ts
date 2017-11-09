import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  product: any
  movs: any[]
  stock: any
  response: any
  constructor() { }

  ngOnInit() {
  }

  onFound(data) {
    console.log('data', data)
    if(!data) {
      this.product = null
      this.movs = null
      this.stock = null
      this.response = null
    } else {
      this.product = data.product
      this.movs = data.movs
      this.stock = data.stock
      this.response = data.response
    }

  }
  
}

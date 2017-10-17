import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-movements',
  templateUrl: './product-movements.component.html',
  styleUrls: ['./product-movements.component.css']
})
export class ProductMovementsComponent implements OnInit {

  @Input() movs: any[]
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { GLOBAL } from '../../../global'
@Component({
  selector: 'app-product-last-position',
  templateUrl: './product-last-position.component.html',
  styleUrls: ['./product-last-position.component.css']
})
export class ProductLastPositionComponent implements OnInit {

  @Input() response: any
  @Input() stock: any
  cityName = GLOBAL.cityName
  regionName = GLOBAL.regionName
  constructor() { }

  ngOnInit() {
  }

}

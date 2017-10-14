import { Component, OnInit, Input } from '@angular/core';
import { GLOBAL } from '../../../global'
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  @Input() order: any;
  cityName = GLOBAL.cityName
  regionName = GLOBAL.regionName
  constructor() { }

  ngOnInit() {
  }

}

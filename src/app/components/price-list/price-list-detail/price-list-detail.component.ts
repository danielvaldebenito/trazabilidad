import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-price-list-detail',
  templateUrl: './price-list-detail.component.html',
  styleUrls: ['./price-list-detail.component.css']
})
export class PriceListDetailComponent implements OnInit {

  @Input() items: any[]
  constructor() { }

  ngOnInit() {
    console.log('items', this.items)
  }

}

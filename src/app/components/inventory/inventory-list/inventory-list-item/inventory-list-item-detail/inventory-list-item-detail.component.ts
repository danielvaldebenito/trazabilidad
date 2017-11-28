import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-inventory-list-item-detail',
  templateUrl: './inventory-list-item-detail.component.html',
  styleUrls: ['./inventory-list-item-detail.component.css']
})
export class InventoryListItemDetailComponent implements OnInit {
  @Input() takes: any[]
  constructor() { }

  ngOnInit() {
  }

}

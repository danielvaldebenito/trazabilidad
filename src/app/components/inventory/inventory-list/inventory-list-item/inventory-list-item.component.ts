import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-inventory-list-item',
  templateUrl: './inventory-list-item.component.html',
  styleUrls: ['./inventory-list-item.component.css']
})
export class InventoryListItemComponent implements OnInit {

  @Input() inventory: any[]
  selected: any;
  constructor() { }

  ngOnInit() {
  }
  toggleInventory(inventory) {
    this.selected = this.selected && this.selected._id == inventory._id ? null : inventory;
  }
}

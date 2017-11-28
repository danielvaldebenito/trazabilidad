import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {

  @Input() inventories: any[]
  selected: any
  constructor() { }

  ngOnInit() {
  }
  

}

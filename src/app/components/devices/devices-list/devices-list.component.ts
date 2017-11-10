import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  @Input() devices: any[]
  @Output() deleted = new EventEmitter()
  selectedDevice: any
  pos: any
  constructor() { }

  ngOnInit() {
  }
  onDeleted() {
    this.deleted.emit();
  }
  
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  @Input() devices: any[]
  selectedDevice: any
  pos: any
  constructor() { }

  ngOnInit() {
  }
  
}

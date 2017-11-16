import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movement-details-maintenance',
  templateUrl: './movement-details-maintenance.component.html',
  styleUrls: ['./movement-details-maintenance.component.css']
})
export class MovementDetailsMaintenanceComponent implements OnInit {

  @Input() data: any
  constructor() { }

  ngOnInit() {
  }

}

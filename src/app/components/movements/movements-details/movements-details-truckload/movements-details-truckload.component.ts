import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movements-details-truckload',
  templateUrl: './movements-details-truckload.component.html',
  styleUrls: ['./movements-details-truckload.component.css']
})
export class MovementsDetailsTruckloadComponent implements OnInit {
  @Input() data: any
  constructor() { }

  ngOnInit() {
  }

}

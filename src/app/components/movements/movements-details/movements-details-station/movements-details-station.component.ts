import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movements-details-station',
  templateUrl: './movements-details-station.component.html',
  styleUrls: ['./movements-details-station.component.css']
})
export class MovementsDetailsStationComponent implements OnInit {
  @Input() data: any
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movements-details-sale',
  templateUrl: './movements-details-sale.component.html',
  styleUrls: ['./movements-details-sale.component.css']
})
export class MovementsDetailsSaleComponent implements OnInit {
  @Input() data: any
  constructor() { }

  ngOnInit() {
  }

}

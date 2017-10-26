import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movements-details-truckunload',
  templateUrl: './movements-details-truckunload.component.html',
  styleUrls: ['./movements-details-truckunload.component.css']
})
export class MovementsDetailsTruckunloadComponent implements OnInit {
  @Input() data: any
  constructor() { }

  ngOnInit() {
  }

}

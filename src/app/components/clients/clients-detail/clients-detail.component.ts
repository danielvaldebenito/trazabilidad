import { Component, OnInit, Input } from '@angular/core';
import { GLOBAL } from '../../../global'
@Component({
  selector: 'app-clients-detail',
  templateUrl: './clients-detail.component.html',
  styleUrls: ['./clients-detail.component.css']
})
export class ClientsDetailComponent implements OnInit {
  @Input() client: any
  @Input() filter: string
  regionName: string = GLOBAL.regionName
  cityName: string = GLOBAL.cityName
  constructor() { 

  }

  ngOnInit() {
  }

}

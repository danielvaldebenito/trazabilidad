import { Component, OnInit } from '@angular/core';
import { DatePipe } from '../../pipes/date.pipe';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  momentValue: Date = new Date();
  formatDate: any;
  view: any[] = [700, 400];
  colorScheme = {
    domain: ['#F44336', '#FFEB3B', '#00C853', '#0091EA', '#000000']
  };
  single = [
  {
    "name": 'RECIBIDO',
    "value": 1
  },
  {
    "name": 'ASIGNADO',
    "value": 2
  },
  {
    "name": 'EN RUTA',
    "value": 4
  },
  {
    "name": 'ENTREGADO',
    "value": 8
  },
  {
    "name": 'CANCELADO',
    "value": 3
  }
];



  constructor() {
    //Object.assign(this, {single, multi})   
   }
  
  ngOnInit() {
    this.formatDate = new DatePipe().transform(new Date())
  }
  onSelect(event) {
    console.log(event);
  }
  
  setMoment(moment: any): any {
    this.momentValue = moment;
  }
}

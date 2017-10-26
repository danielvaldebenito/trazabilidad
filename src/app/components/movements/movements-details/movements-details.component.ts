import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movements-details',
  templateUrl: './movements-details.component.html',
  styleUrls: ['./movements-details.component.css']
})
export class MovementsDetailsComponent implements OnInit {
  @Input() type: any
  @Input() data: any
  constructor() { }

  ngOnInit() {
    console.log({type: this.type, data: this.data})
  }

}

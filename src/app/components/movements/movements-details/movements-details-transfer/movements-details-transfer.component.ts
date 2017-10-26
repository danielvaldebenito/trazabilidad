import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movements-details-transfer',
  templateUrl: './movements-details-transfer.component.html',
  styleUrls: ['./movements-details-transfer.component.css']
})
export class MovementsDetailsTransferComponent implements OnInit {
  @Input() data: any
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DistributorsService } from '../../../services/distributors.service'
@Component({
  selector: 'app-distributors-list',
  templateUrl: './distributors-list.component.html',
  styleUrls: ['./distributors-list.component.css']
})
export class DistributorsListComponent implements OnInit {

  @Input() distributors: any[]
  @Input() fromModal: boolean = false
  @Input() filter: string
  @Output() select = new EventEmitter<any>();
  constructor(
  ) { }

  ngOnInit() {

  }

  selectOne (distributor) {
    this.select.emit(distributor);
  }

}

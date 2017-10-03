import { Component, OnInit, Input } from '@angular/core';
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
  constructor(
  ) { }

  ngOnInit() {

  }

  

}

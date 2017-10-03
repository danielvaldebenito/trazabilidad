import { Component, OnInit } from '@angular/core';
import { DistributorsService } from '../../services/distributors.service'
import { PagerService } from '../../services/pager.service'
@Component({
  selector: 'app-distributors',
  templateUrl: './distributors.component.html',
  styleUrls: ['./distributors.component.css']
})
export class DistributorsComponent implements OnInit {

  filter: string = ''
  limit: number = 20
  currentPage: number = 1
  pager: any = {}
  distributors: any[]
  constructor(
    private _distributorService: DistributorsService,
    private _pagerService: PagerService
  ) { }

  ngOnInit() {
    this.getDistributors()
  }
  getDistributors() {
    this._distributorService.get(this.filter, this.limit, this.currentPage)
      .subscribe(res => {
        if(res.done) {
          this.distributors = res.data
          this.pager = this._pagerService.getPager(res.total, this.currentPage, this.limit)
        }
      }, error => console.log(error))
  }
  onKey() {
    this.getDistributors()
  }
}

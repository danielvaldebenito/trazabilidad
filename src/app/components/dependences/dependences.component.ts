import { Component, OnInit } from '@angular/core';
import { DependencesService } from '../../services/dependences.service'
import { PagerService } from '../../services/pager.service'
@Component({
  selector: 'app-dependences',
  templateUrl: './dependences.component.html',
  styleUrls: ['./dependences.component.css']
})
export class DependencesComponent implements OnInit {
  dependences: any[]
  filter: string = ''
  limit: number = 10
  currentPage: number = 1
  pager: any = {}
  
  constructor(
    private _dependencesService: DependencesService,
    private _pagerService: PagerService
  ) { }
  
  ngOnInit() {
    this.getDependences()
  }
  getDependences () {
    this._dependencesService
        .getDependences(this.filter, this.limit, this.currentPage)
        .subscribe(res => {
          console.log(res)
          if(res.done) {
            this.dependences = res.data
            if(!this.dependences.length && this.currentPage > 1){
              this.currentPage--;
              this.getDependences()
              return;
            }
              
            this.pager = this._pagerService.getPager(res.total, this.currentPage, this.limit)
          }
        }, error => console.log(error))
  }
  onKey (key) {
    this.getDependences()
  }
  onDelete () {
    this.getDependences()
  }
  setPage (page) {
    this.currentPage = page
    this.getDependences()
  }
  refresh() {
    this.getDependences();
  }
}

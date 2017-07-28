import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'
import { PagerService } from '../../services/pager.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[]
  filter: string = ''
  limit: number = 10
  currentPage: number = 1
  pager: any = {};
  constructor(
    private _usersService : UsersService,
    private _pagerService: PagerService
  ) { }

  ngOnInit() {
    this.refresh()
  }

  getUsers (filter: any, limit: any, page: any) {
    this._usersService.getUsers (filter, limit, page)
        .subscribe(res => {
          console.log(res)
          if (res.done) {
            var data = res.data;
            var records = data.records;
            this.users = records;
            this.pager = this._pagerService.getPager(data.total, this.currentPage, limit);
          }
        }, error => console.log(error))
  }
  setPage(page: number) {
      this.currentPage = page;
      this.refresh();
  }
  onKey(e) {
    this.currentPage = 1
    this.refresh()
  }
  refresh () {
    this.getUsers(this.filter, this.limit, this.currentPage)
  }
}

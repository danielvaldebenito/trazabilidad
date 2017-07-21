import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[]
  constructor(
    private _usersService : UsersService
  ) { }

  ngOnInit() {
    this.getUsers ('', 10, 1)
        
  }

  getUsers (filter: any, limit: any, page: any) {
    this._usersService.getUsers (filter, limit, page)
        .subscribe(res => {
          console.log(res)
          if (res.done) {
            var data = res.data;
            var records = data.records;
            this.users = records
          }
        }, error => console.log(error))
  }
}

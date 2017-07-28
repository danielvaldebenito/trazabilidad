import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GLOBAL } from '../../../global'
import { UserService } from '../../../services/user.service'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @Input() users: any[]
  @Input() pager: any = {}
  apiUrl: string = GLOBAL.apiUrl;
  iAmAdmin: any
  constructor(
    private _userService: UserService
  ) { 
    this.iAmAdmin = this._userService.getUserIdentity().isAdmin;
  }

  ngOnInit() {
  }

  iAm (user) {
    return this._userService.getUserIdentity().username == user.username
  }
}

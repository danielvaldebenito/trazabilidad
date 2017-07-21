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
  apiUrl: string = GLOBAL.apiUrl;
  constructor(
    private _userService: UserService
  ) { }

  ngOnInit() {
  }

  iAm (user) {
    return this._userService.getUserIdentity().username == user.username
  }
}

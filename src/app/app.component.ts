import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  identity: any;
  token: string;
  constructor(private _userService: UserService){
    
  }
  ngOnInit() {
    this.refresh();
  }
  refresh() {
    this.identity = this._userService.getUserIdentity();
    this.token = this._userService.getToken();
  }
  logout() {
    this._userService.clear();
    this.refresh();
  }
}

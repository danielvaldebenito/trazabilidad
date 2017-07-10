import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { NotificationComponent, NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  identity: any;
  token: string;
  public confirmOptions = {
    confirmText: 'Sí',
    declineText: 'No'
  }
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _notificationService: NotificationsService
  )
  { }


  ngOnInit() {
    this.refresh();
    this._notificationService.success('Title', 'content');
  }
  refresh() {
    this.identity = this._userService.getUserIdentity();
    this.token = this._userService.getToken();
  }
  logout() {
    this._userService.clear();
    this._router.navigate(['']);
    this.refresh();
  }
}

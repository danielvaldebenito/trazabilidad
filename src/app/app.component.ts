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
  public notificationsOptions = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: true
  }
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _notificationService: NotificationsService
  )
  { }

  ngOnInit() {
    this.refresh();
  }
  refresh() {
    this.identity = this._userService.getUserIdentity();
    this.token = this._userService.getToken();
    if(this.identity && this.token) {
      this._userService.validateToken(this.token)
          .subscribe(
            res => { console.log('validation ok', res) },
            err => { 
              if(err.status == 404)
                this.logout();
            }
          )
        
    }
  }
  logout() {
    this._userService.clear();
    this._router.navigate(['']);
    this.refresh();
  }
}

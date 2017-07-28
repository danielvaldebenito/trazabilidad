import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AppComponent } from '../../app.component';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: User;
  private title: string;
  private loading: boolean;
  private identity: any;
  private token: string;
  @Output() loginResetPass = new EventEmitter<any> ();
  @Output() login = new EventEmitter ();
  constructor(
    private _userService: UserService, 
    private _app: AppComponent,
    private _notify: NotificationsService
  ) {
    this.user = new User('', '');
    this.title = 'BIENVENIDO';
    this.loading = false;
   }


  ngOnInit() {
  }
  onSubmit() {
    this._userService.login(this.user)
          .subscribe(
            res => {
              var done = res.done
              var message = res.message
              var code = res.code
              var data = res.data
              if(done)
              {
                if(res.code == 0) {
                  var token = data.token
                  var realPass = this.user.password
                  this.user = data.user
                  this.user.password = realPass
                  this._notify.success('Ingreso Correcto', 'Bienvenido')
                  this._userService.setToken(token);
                  this._userService.setUserIdentity(this.user);
                  this._app.refresh();
                }
                else {
                  this.loginResetPass.emit(this.user);
                }
              } else {
                this._notify.error('Error', message)
              }
              this.loading = false;
            },
            err => {
                var body = JSON.parse(err._body)
                this._notify.error('Error',body.message)
                this.loading = false;
            }
          )
  }

}

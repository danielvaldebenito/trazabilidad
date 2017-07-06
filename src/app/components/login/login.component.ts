import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: User;
  private errorMessage: string;
  private successMessage: string;
  private title: string;
  private loading: boolean;
  private identity: any;
  private token: string;
  constructor(private _userService: UserService, private _app: AppComponent) {
    this.user = new User('', '');
    this.errorMessage = null;
    this.successMessage = null;
    this.title = 'BIENVENIDO';
    this.loading = false;
   }


  ngOnInit() {
  }
  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;
    this._userService.login(this.user)
          .subscribe(
            res => {
              var done = res.done
              var message = res.message
              var code = res.code
              var data = res.data
              if(done)
              {
                var token = data.token
                
                var realPass = this.user.password
                this.user = data.user
                this.user.password = realPass
                this.successMessage = message
                this._userService.setToken(token);
                this._userService.setUserIdentity(this.user);
                this._app.refresh();
              } else {
                this.errorMessage = message
              }
              this.loading = false;
            },
            err => {
                var body = JSON.parse(err._body)
                this.errorMessage = body.message
                this.loading = false;
            }
          )
  }

}

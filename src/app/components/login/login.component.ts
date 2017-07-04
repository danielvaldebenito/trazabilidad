import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: User;
  private errorMessage: string;
  constructor(private _userService: UserService) {
    this.user = new User('', '');
    this.errorMessage = '';
   }

  ngOnInit() {
    
  }
  onSubmit() {
    console.log(this.user)
    this._userService.login(this.user)
          .subscribe(
            res => {
              console.log(res)
            },
            err => {
              if(err.status == 404)
              {
                var body = JSON.parse(err._body)
                this.errorMessage = body.message
              }
            }
          )
  }

}

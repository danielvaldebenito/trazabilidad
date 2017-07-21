import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { UserService } from './user.service'

@Injectable()
export class UsersService {
  headers: any;
  user: any;
  url: any = GLOBAL.apiUrl;
  constructor(
    private _userService: UserService,
    private _http: Http
  ) { 
    this.headers = new Headers({
        'Authorization': this._userService.getToken(),
        'Content-Type': 'application/json'
    })
    this.user = this._userService.getUserIdentity ();
  }

  getUsers (filter, limit, page) {
    
    var url = this.url + 'users/' + this.user.distributor;
    var params = { filter: filter, limit: limit, page: page }
    return this._http.get(url, { headers: this.headers, params: params })
            .map(res => res.json());
  }
}

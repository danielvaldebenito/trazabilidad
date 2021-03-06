import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { UserService } from './user.service';
@Injectable()
export class SaleService {
  url: string  = GLOBAL.apiUrl;
  user: any;
  private headers;
  constructor(
    private _userService: UserService,
    private _http: Http,
  ) 
  { 
    this.headers = new Headers({
            'Authorization': this._userService.getToken(),
            'Content-Type': 'application/json'
        })
    this.user = this._userService.getUserIdentity();
  }

  getOrderAndSale (id: string) {
    const url = this.url + 'sale-order/' + id;
    return this._http.get(url, { headers: this.headers })
            .map(res => res.json());
  }
  
}

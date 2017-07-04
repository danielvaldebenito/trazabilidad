import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    public url: string = 'http://localhost:3548/api/';
    constructor(private _http: Http){

    }

    login (user) {
        let json = JSON.stringify (user);
        let headers = new Headers({ 'Content-Type': 'application/json' })
        return this._http.post(this.url + 'login', json, { headers: headers })
                        .map(res => res.json());
    }
}
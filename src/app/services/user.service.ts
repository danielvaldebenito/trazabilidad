import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';

@Injectable()
export class UserService {
    public url: string = GLOBAL.apiUrl;
    constructor(private _http: Http){

    }

    login (user) {
        let json = JSON.stringify (user);
        let headers = new Headers({ 'Content-Type': 'application/json' })
        return this._http.post(this.url + 'login', json, { headers: headers })
                        .map(res => res.json());
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }
    getToken () {
        return localStorage.getItem('token');
    }
    setUserIdentity (user: any) {
        localStorage.setItem('identity', JSON.stringify(user));
    }
    getUserIdentity () {
        return JSON.parse(localStorage.getItem('identity'));
    }
    clear() {
        localStorage.clear();

    }
}
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
    validateToken (token) {
        var headers = new Headers ({ 'Content-Type': 'application/json', 'Authorization': token });
        return this._http.get(this.url + 'test', { headers: headers })
            .map(res => res.json());
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
    setRegionLocalUser (region: any) {
        localStorage.setItem('region', JSON.stringify(region));
    }
    setCityLocalUser (city: any) {
        localStorage.setItem('city', JSON.stringify(city));
    }
    getRegionLocalUser () {
        var region = localStorage.getItem('region');
        if(region) { return JSON.parse(region) }
        else { return null }
    }
    getCityLocalUser () {
        var city = localStorage.getItem('city');
        if(city) { return JSON.parse(city) }
        else return null
    }
}
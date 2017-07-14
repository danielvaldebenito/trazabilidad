import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { UserService } from './user.service';


@Injectable()
export class AddressService {
    public url: string = GLOBAL.apiUrl;
    private headers;
    constructor(private _http: Http, private _us: UserService){
        this.headers = new Headers({
            'Authorization': this._us.getToken(),
            'Content-Type': 'application/json'
        })
    }

    getAddresses () {
        var url = this.url + 'address/';
        return this._http.get(url, { headers: this.headers })
                .map(res => res.json());
    }

}
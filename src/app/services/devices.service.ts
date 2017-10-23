import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { UserService } from './user.service';


@Injectable()
export class DevicesService {
    public url: string = GLOBAL.apiUrl;
    private headers;
    user: any
    constructor(private _http: Http, private _us: UserService){
        this.headers = new Headers({
            'Authorization': this._us.getToken(),
            'Content-Type': 'application/json'
        })
        this.user = this._us.getUserIdentity()
    }

    get (filter: string, limit: number, page: number) {
        const url = this.url + 'devices';
        const distributor = this.user.distributor._id;
        let params = !this.user.distributor.intern ? 
        { filter: filter, limit: limit, page: page, distributor: distributor } : 
        { filter: filter, limit: limit, page: page }

        return this._http.get(url, { headers: this.headers, params: params })
                .map(res => res.json());
    }
    setPos(device: string, pos: string) {
        const url = this.url + 'device-set-pos';
        const body = { device, pos }
        return this._http.put(url, body, { headers: this.headers })
            .map(res => res.json())
    }
}
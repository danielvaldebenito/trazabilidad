import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { UserService } from './user.service';


@Injectable()
export class VehicleService {
    public url: string = GLOBAL.apiUrl;
    constructor(private _http: Http, private _us: UserService){

    }

    getVehicles (filter: string, limit: number, page: number) {
        let headers = new Headers({
            'Authorization': this._us.getToken(),
            'Content-Type': 'application/json'
        })
        var myDistributor = this._us.getUserIdentity().distributor;
        var url = this.url + 'vehicle/' + myDistributor;
        var params = { filter: filter, limit: limit, page: page }
        return this._http.get(url, { headers: headers, params: params })
                .map(res => res.json());
    }
}
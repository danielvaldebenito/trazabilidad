import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { UserService } from './user.service';


@Injectable()
export class VehicleService {
    public url: string = GLOBAL.apiUrl;
    private headers;
    constructor(private _http: Http, private _us: UserService){
        this.headers = new Headers({
            'Authorization': this._us.getToken(),
            'Content-Type': 'application/json'
        })
    }

    getVehicles (filter: string, limit: number, page: number) {
        
        var myDistributor = this._us.getUserIdentity().distributor;
        var url = this.url + 'vehicle/' + myDistributor;
        var params = { filter: filter, limit: limit, page: page }
        return this._http.get(url, { headers: this.headers, params: params })
                .map(res => res.json());
    }

    postVehicle (vehicle: any) {
        var myDistributor = this._us.getUserIdentity().distributor;
        var url = this.url + 'vehicle/';
        var params = vehicle;
        return this._http.post(url, params, { headers: this.headers })
                        .map(res => res.json());
    }
}
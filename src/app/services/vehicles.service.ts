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
    private user;
    constructor(private _http: Http, private _us: UserService){
        this.headers = new Headers({
            'Authorization': this._us.getToken(),
            'Content-Type': 'application/json'
        })
        this.user = this._us.getUserIdentity();
    }

    getVehicles (filter: string, limit: number, page: number) {
        const myDistributor = this.user.distributor._id;
        const url = this.url + 'vehicles/' + myDistributor;
        const params = { filter: filter, limit: limit, page: page, dependence: this.user.dependence }
        return this._http.get(url, { headers: this.headers, params: params })
                .map(res => res.json());
    }

    postVehicle (vehicle: any) {
        var url = this.url + 'vehicle/';
        var params = vehicle;
        params.distributor = this.user.distributor._id
        return this._http.post(url, params, { headers: this.headers })
                        .map(res => res.json());
    }

    getOneVehicle(id: string) {
        var url = this.url + 'vehicle/' + id;
        return this._http.get(url, { headers: this.headers })
                        .map(res => res.json());
    }

    updateVehicle (id: string, vehicle: any) {
        var url = this.url + 'vehicle/' + id;
        return this._http.put(url, vehicle, { headers: this.headers })
                        .map(res => res.json());
    }

    deleteVehicle (id: string) {
        var url = this.url + 'vehicle/' + id;
        return this._http.delete(url, { headers: this.headers })
                        .map(res => res.json());
    }

    forceLogout(username: string) {
        const url = this.url + 'device/logout/' + username
        return this._http.put(url, {}, { headers: this.headers, params: { bo: true } })
                        .map(res => res.json())
    }
}
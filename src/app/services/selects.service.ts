import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { UserService } from './user.service';
@Injectable()
export class SelectsService {
    public url: string = GLOBAL.apiUrl + 'selects/';
    public headers: any;
    constructor(private _http: Http, private _userService: UserService){
        this.headers = new Headers ({
            'Content-Type': 'application/json',
            'Authorization': this._userService.getToken()
        })
    }

    // Vehicles
    getVehicleTypes() {
        return this._http.get(this.url + 'vehicleTypes', {headers: this.headers})
                    .map(res => res.json());
    }
    getCountryData () {
        return this._http.get(this.url + 'country', { headers: this.headers })
                        .map(res => res.json())
    }
    getVehicleToAsign (type: string) {
        var params = { type: type }
        var myDistributor = this._userService.getUserIdentity().distributor;
        return this._http.get(this.url + 'vehicles/' + myDistributor, { headers: this.headers, params: params })
                        .map(res => res.json())
    }
    getDependences () {
        var myDistributor = this._userService.getUserIdentity().distributor;
        var params = { distributor: myDistributor };
        return this._http.get(this.url + 'dependences', { headers: this.headers, params: params })
                        .map(res => res.json())
    }
    
}
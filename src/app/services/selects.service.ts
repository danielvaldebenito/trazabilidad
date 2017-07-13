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
}
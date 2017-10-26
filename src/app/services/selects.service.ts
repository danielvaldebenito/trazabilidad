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
    myUser: any
    constructor(private _http: Http, private _userService: UserService){
        this.headers = new Headers ({
            'Content-Type': 'application/json',
            'Authorization': this._userService.getToken()
        })
        this.myUser = this._userService.getUserIdentity()
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
    getVehicleToAsign (type?: string) {
        var params = { type: type }
        var myDistributor = this.myUser.distributor._id;
        return this._http.get(this.url + 'vehicles/' + myDistributor, { headers: this.headers, params: params })
                        .map(res => res.json())
    }
    getDependences () {
        const myDistributor = this.myUser.distributor._id;
        let params = { distributor: myDistributor, dependence: this.myUser.dependence };
        
        return this._http.get(this.url + 'dependences', { headers: this.headers, params: params })
                        .map(res => res.json())
    }
    getRoles () {
        return this._http.get(this.url + 'roles', { headers: this.headers })
                        .map(res => res.json ())
    }
    getProcesses () {
        return this._http.get(this.url + 'internal-process-types', { headers: this.headers})
                    .map(res => res.json())
    }
    getUserFromRol (rol) {
        var url = this.url + 'user-rol/' + this.myUser.distributor._id + '/' + rol
        return this._http.get(url, { headers: this.headers})
                    .map(res => res.json())
    }
    getOrderStates () {
        var url = this.url + 'order-states/'
        return this._http.get(url, { headers: this.headers})
                    .map(res => res.json())
    }
    getPayMethods () {
        var url = this.url + 'pay-methods/'
        return this._http.get(url, { headers: this.headers})
                    .map(res => res.json())
    }
    getPos(type: any) {
        const url = this.url + 'pos/' +  this.myUser.distributor._id
        return this._http.get(url, { headers: this.headers, params: { type: type } })
                .map(res => res.json())
    }
    getTransactionTypes() {
        const url = this.url + 'transaction-types/'
        return this._http.get(url, { headers: this.headers})
                .map(res => res.json())
    }
}   
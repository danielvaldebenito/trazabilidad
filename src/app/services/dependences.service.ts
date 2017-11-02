import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { UserService } from './user.service';


@Injectable()
export class DependencesService {
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

    getDependences (filter: string, limit: number, page: number) {
        var myDistributor = this.user.distributor._id;
        var url = this.url + 'dependences/' + myDistributor;
        var params = { filter: filter, limit: limit, page: page }
        return this._http.get(url, { headers: this.headers, params: params })
                .map(res => res.json());
    }

    postDependence (dependence: any) {
        var url = this.url + 'dependence/';
        var params = dependence;
        params.distributor = this.user.distributor
        return this._http.post(url, params, { headers: this.headers })
                        .map(res => res.json());
    }

    getOneDependence(id: string) {
        var url = this.url + 'dependence/' + id;
        return this._http.get(url, { headers: this.headers })
                        .map(res => res.json());
    }
    getWarehousesOfOne(id: string) {
        const url = this.url + 'dependence/warehouses/' + id;
        return this._http.get(url, { headers: this.headers })
                        .map(res => res.json())
    }

    updateDependence (id: string, dependence: any) {
        var url = this.url + 'dependence/' + id;
        return this._http.put(url, dependence, { headers: this.headers })
                        .map(res => res.json());
    }

    deleteDependence (id: string) {
        var url = this.url + 'dependence/' + id;
        return this._http.delete(url, { headers: this.headers })
                        .map(res => res.json());
    }
}
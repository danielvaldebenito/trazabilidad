import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { UserService } from './user.service';


@Injectable()
export class DistributorsService {
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
        var url = this.url + 'distributors';
        var params = { filter: filter, limit: limit, page: page }
        return this._http.get(url, { headers: this.headers, params: params })
                .map(res => res.json());
    }

    post (distributor: any) {
        var url = this.url + 'distributor/';
        var params = distributor;
        params.distributor = this.user.distributor
        return this._http.post(url, params, { headers: this.headers })
                        .map(res => res.json());
    }

    getOne(id: string) {
        var url = this.url + 'distributor/' + id;
        return this._http.get(url, { headers: this.headers })
                        .map(res => res.json());
    }

    update (id: string, distributor: any) {
        var url = this.url + 'distributor/' + id;
        return this._http.put(url, distributor, { headers: this.headers })
                        .map(res => res.json());
    }

    delete(id: string) {
        var url = this.url + 'distributor/' + id;
        return this._http.delete(url, { headers: this.headers })
                        .map(res => res.json());
    }
}
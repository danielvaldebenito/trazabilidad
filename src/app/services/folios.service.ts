import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { UserService } from './user.service';


@Injectable()
export class FoliosService {
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

    getFolios (filter: string, limit: number, page: number) {
        var myDistributor = this.user.distributor._id;
        var url = this.url + 'folios/' + myDistributor;
        var params = { filter: filter, limit: limit, page: page }
        return this._http.get(url, { headers: this.headers, params: params })
                .map(res => res.json());
    }

    postFolio (folio: any) {
        var url = this.url + 'folio/';
        var params = folio;
        params.distributor = this.user.distributor._id
        return this._http.post(url, params, { headers: this.headers })
                        .map(res => res.json());
    }

    getOneFolio(id: string) {
        var url = this.url + 'folio/' + id;
        return this._http.get(url, { headers: this.headers })
                        .map(res => res.json());
    }

    deleteFolio (id: string) {
        var url = this.url + 'folio/' + id;
        return this._http.delete(url, { headers: this.headers })
                        .map(res => res.json());
    }
}
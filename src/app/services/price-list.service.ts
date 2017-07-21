import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { UserService } from './user.service';


@Injectable()
export class PriceListService {
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

    getPriceLists () {
        var myDistributor = this.user.distributor;
        var url = this.url + 'priceList/' + myDistributor;
        return this._http.get(url, { headers: this.headers })
                .map(res => res.json());
    }

    postPriceList (priceList: any) {
        var url = this.url + 'priceList/';
        var body = priceList;
        body.distributor = this.user.distributor;
        return this._http.post(url, body, { headers: this.headers })
                        .map(res => res.json());
    }

    getOnePriceList(id: string) {
        var url = this.url + 'priceList/pl/' + id;
        return this._http.get(url, { headers: this.headers })
                        .map(res => res.json());
    }

    updatePriceList (id: string, priceList: any) {
        var url = this.url + 'priceList/' + id;
        return this._http.put(url, priceList, { headers: this.headers })
                        .map(res => res.json());
    }

    deletePriceList (id: string) {
        var url = this.url + 'priceList/' + id;
        return this._http.delete(url, { headers: this.headers })
                        .map(res => res.json());
    }
}
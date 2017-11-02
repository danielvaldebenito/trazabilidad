import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { UserService } from './user.service';


@Injectable()
export class StockService {
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

    getStockWarehouse (warehouse) {
        const url = this.url + 'stock-warehouse/' + warehouse;
        return this._http.get(url, { headers: this.headers })
                .map(res => res.json());
    }
}
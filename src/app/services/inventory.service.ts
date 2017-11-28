import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { UserService } from './user.service';
import { saveAs } from 'file-saver'

@Injectable()
export class InventoryService {
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

    get (from: string, to: string, filter: string, limit: number, page: number) {
        const url = this.url + 'simple-inventory';
        const params = { filter: filter, limit: limit, page: page, from, to }
        return this._http.get(url, { headers: this.headers, params: params })
                .map(res => res.json());
    }

    export (from: string, to: string, filter: string, limit: number, page: number) {
        const url = this.url + 'simple-inventory-export';
        const params = { filter: filter, limit: limit, page: page, from, to }
        return this._http.get(url, { headers: this.headers, params: params, responseType: ResponseContentType.Blob })
                .map(res => this.saveToFileSystem(res, `INVENTARIO ${from} ${to}.xlsx`));
    }
    private saveToFileSystem(response, filename) {
        const blob = new Blob([response._body], { type: 'text/plain' });
        saveAs(blob, filename);
    }
}
import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { UserService } from './user.service';


@Injectable()
export class MovementsService {
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

    get (type: string, limit: number, page: number, from: string, to: string) {
        const url = this.url + 'movements';
        const dist = this.user.distributor._id
        const params = { type: type, limit: limit, page: page, distributor: dist, from, to }
        return this._http.get(url, { headers: this.headers, params: params })
                .map(res => res.json());
    }
    getDetails (type: string, id: string) {
        let url = this.url
        switch (type) {
            case 'VENTA': url += 'transaction/sale/' + id; break;
            case 'AJUSTE': url += 'transaction/adjust/' + id; break;
            case 'DEVOLUCIÓN': url += 'transaction/devolution/' + id; break;
            case 'MANTENCIÓN': url += 'transaction/maintenance/' + id; break;
            case 'CARGA': url += 'transaction/truckload/' + id; break;
            case 'DESCARGA': url += 'transaction/truckunload/' + id; break;
            case 'TRANSFERENCIA': url += 'transaction/transfer/' + id; break;
            case 'ESTACIÓN': url += 'transaction/station/' + id; break;
        }
        return this._http.get(url, { headers: this.headers })
        .map(res => res.json());
    }
}
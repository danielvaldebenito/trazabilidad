import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { UserService } from './user.service';


@Injectable()
export class ClientsService {
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

    getClients (filter: string, limit: number, page: number) {
        var url = this.url + 'clients/'
        var params = { filter: filter, limit: limit, page: page }
        return this._http.get(url, { headers: this.headers, params: params })
                .map(res => res.json());
    }
    getDiscountsAndSurcharge (clientId) {
        var url = this.url + 'discount-surcharge/' + clientId
        return this._http.get(url, {headers: this.headers})
                        .map(res => res.json())
    }
    postClients (client: any) {
        var url = this.url + 'client/';
        var params = client;
        return this._http.post(url, params, { headers: this.headers })
                        .map(res => res.json());
    }
    postClientsQuick (client: any) {
        var url = this.url + 'client-quick/';
        var params = client;
        return this._http.post(url, params, { headers: this.headers })
                        .map(res => res.json());
    }
    getOneClient(id: string) {
        var url = this.url + 'client/' + id;
        return this._http.get(url, { headers: this.headers })
                        .map(res => res.json());
    }
    getOneClientByNit(nit: string) {
        var url = this.url + 'client-nit/' + nit;
        return this._http.get(url, { headers: this.headers })
            .map(res => res.json());
    }
    validateNit(nit: string) {
        var url = this.url + 'client-validate-nit/' + nit;
        return this._http.get(url, { headers: this.headers })
                        .map(res => res.json());
    }

    updateClient (id: string, client: any) {
        var url = this.url + 'client/' + id;
        return this._http.put(url, client, { headers: this.headers })
                        .map(res => res.json());
    }

    deleteDependence (id: string) {
        var url = this.url + 'client/' + id;
        return this._http.delete(url, { headers: this.headers })
                        .map(res => res.json());
    }

}
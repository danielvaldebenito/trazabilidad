import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { UserService } from './user.service';


@Injectable()
export class InternalProcessesService {
    public url: string = GLOBAL.apiUrl;
    private headers;
    private myUser: any
    constructor(private _http: Http, private _us: UserService){
        this.headers = new Headers({
            'Authorization': this._us.getToken(),
            'Content-Type': 'application/json'
        })
        this.myUser = this._us.getUserIdentity ()
    }
    get (filter, sidx, sord, page, limit) {
        var url = this.url + 'internal-processes/' + this.myUser.distributor._id
        return this._http.get(url, {headers: this.headers, params: { filter, sidx, sord, page, limit }})
                    .map(res => res.json())
    }
    getOne (id) {
        var url = this.url + 'internal-process/' + id
        return this._http.get(url, {headers: this.headers })
                    .map(res => res.json())
    }
    getByDependence(dependence: string) {
        var url = this.url + 'internal-process-dependence/' + dependence
        return this._http.get(url, {headers: this.headers })
        .map(res => res.json())
    }
    getByDependenceAndType(dependence: string, type: string) {
        var url = this.url + 'internal-process-dependence-type/' + dependence + '/' + type
        return this._http.get(url, {headers: this.headers })
        .map(res => res.json())
    }
    post(ip: any) {
        var url = this.url + 'internal-process/'
        return this._http.post(url, ip, { headers: this.headers })
            .map(res => res.json())
    }

    update (id: string, ip: any) {
        var url = this.url + 'internal-process/' + id
        return this._http.put(url, ip, { headers: this.headers })
            .map(res => res.json())
    }
    delete(ipId: number) {
        var url = this.url + 'internal-process/' + ipId
        return this._http.delete(url, { headers: this.headers })
            .map(res => res.json())
    }
}
import { Http, Response, Headers, ResponseContentType, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { UserService } from './user.service';
import { saveAs } from 'file-saver/FileSaver'
import * as moment from 'moment'
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

    exportToExcel(dependence?: any, warehouseType?: any, warehouse?: any) {
        const url = this.url + 'stock-export/';
        let date = moment().format('DD-MM-YYYY')
        const params = { dependence, warehouseType, warehouse }
        return this._http.get(url, { headers: this.headers, responseType: ResponseContentType.Blob, params })
                .map(res => this.saveToFileSystem(res, `STOCK NIFS AL ${date}.xlsx`));
    }
    private saveToFileSystem(response, filename) {
        const blob = new Blob([response._body], { type: 'text/plain' });
        saveAs(blob, filename);
      }

}
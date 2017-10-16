import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { UserService } from './user.service';
@Injectable()
export class OrderService {
  url: string  = GLOBAL.apiUrl;
  user: any;
  private headers;
  constructor(
    private _userService: UserService,
    private _http: Http,
  ) 
  { 
    this.headers = new Headers({
            'Authorization': this._userService.getToken(),
            'Content-Type': 'application/json'
        })
    this.user = this._userService.getUserIdentity();
  }

  getOrders (state: string, filter: string, date: Date, limit: number = 200, page: number = 1, sidx? : string, sord?: number) {
    console.log('servicio orders', {state, filter, date, limit, page })
    var myDistributor = this.user.distributor._id;
        var url = this.url + 'orders/' + myDistributor;
        var params = { 
          filter: filter, 
          state: state, 
          date: date, 
          limit: limit, 
          page: page,
          sidx: sidx || '_id',
          sord: sord || 1
         }
        return this._http.get(url, { headers: this.headers, params: params })
                .map(res => res.json());
  }
  getProductTypes (type? : any) {
      const params = { type: type }
      return this._http.get(this.url + 'productType', { params: params, headers: this.headers })
                      .map(res => res.json())
  }
  getPriceLists () {
    var myDistributor = this.user.distributor._id;
    return this._http.get(this.url + 'pricelist/' + myDistributor, { headers: this.headers })
                    .map(res => res.json())
  }
  getResume (date) {
    var params = { date: date }
    var myDistributor = this.user.distributor._id;
    return this._http.get(this.url + '/order-resume/' + myDistributor, { headers: this.headers, params: params })
                        .map(res => res.json());
  }
  postOrder (order: any) {
    var url = this.url + 'order/';
    var myDistributor = this.user.distributor._id;
    order.distributor = myDistributor;
    var body = order;
    return this._http.post(url, body, { headers: this.headers })
                    .map(res => res.json());
  }
  requestClosest (requestId: string, lat: number, lng: number) {
    var url = this.url + 'georeference-request/';
    var myDistributor = this.user.distributor._id;
    var body = { lat: lat, lng: lng, distributor: myDistributor, requestId: requestId, user: this.user.distributor };
    return this._http.post(url, body, { headers: this.headers })
                    .map(res => res.json());
  }
  responseClosest (requestId: string) {
    var url = this.url + 'georeference/';
    return this
            ._http
            .get (url + requestId, { headers: this.headers })
            .map(res => res.json())

  }
  cancelOrder (id: string) {
    var url = this.url + 'order-cancel/' + id;
    return this
            ._http
            .put (url, {}, { headers: this.headers })
            .map(res => res.json())
  }
  assignDeviceToOrder (orderId, device, old) {
    var url = this.url + 'order-assign-device';
    return this._http
                .put(url, { order: orderId, device: device, old }, {headers: this.headers})
                .map(res => res.json())
  }

  reassignDeviceToOrder (orderId, device, old) {
    var url = this.url + 'order-reassign-device';
    return this._http
                .put(url, { order: orderId, device: device, old }, {headers: this.headers})
                .map(res => res.json())
  }
  
}

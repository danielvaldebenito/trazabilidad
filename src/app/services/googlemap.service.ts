import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { Http } from '@angular/http';


@Injectable()
export class GoogleMapService {

    private apiKey = environment.GOOGLE_MAPS_API_KEY;
    constructor(private _http: Http){

    }

    getCoordinatesFromAddress(address) {
        var params = { address: address, key: this.apiKey }
        return this._http.get('https://maps.google.com/maps/api/geocode/json', { params: params })
            .map(res => res.json())
    }
    getAddressFromCoordinates(lat: number, lng: number) {
        var latlng = { lat: lat, lng: lng }
        var params = { latlng: lat + "," + lng, key: this.apiKey }
        return this._http.get('https://maps.google.com/maps/api/geocode/json', { params: params })
            .map(res => res.json())
    }
}

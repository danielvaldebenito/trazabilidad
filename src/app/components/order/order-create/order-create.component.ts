import { Component, OnInit } from '@angular/core';
import { SelectsService } from '../../../services/selects.service';
import { OrderService } from '../../../services/order.service';
import { GoogleMapService } from '../../../services/googlemap.service';
import { ConfirmationComponent, ConfirmationService } from '@jaspero/ng2-confirmations'
import { ResolveEmit } from "@jaspero/ng2-confirmations/src/interfaces/resolve-emit";
import { IOption } from 'ng-select'
import { GLOBAL } from '../../../global';
import * as Enumerable from 'linq';
@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {

  regionName = GLOBAL.regionName;
  cityName = GLOBAL.cityName;
  // order
  order: any = {}
  // selects
  allRegions: any[]
  regions: Array<IOption> = []
  cities: Array<IOption> = []
  selectedRegion: any = {}

  productTypes: Array<IOption> = []
  // items
  items: any[] = [];
  item: any = { quantity: 1};
  // MAPA
  lat: number;
  lng: number;
  zoom: number = 14;

  errorMessageItems: string

  constructor(
    private _selectsService: SelectsService,
    private _orderService: OrderService,
    private _mapService: GoogleMapService,
  ) { }
  
  ngOnInit() {
    this.getRegions();
    this.getProductTypes();
  }
  // COMBOS
  getRegions () {
    this._selectsService.getCountryData()
        .subscribe(
          res => {
            var data = res.data;
            this.allRegions = data;
            var array = [];
            data.forEach(d => {
              var option = { label: d.departamento, value: d.departamento }
              array.push(option)
            })
            this.regions = array;
            console.log(this.regions)
          },
          error => {

          }
        )
  }
  onSelectRegion(region) {
    console.log('select', region)
    this.selectedRegion = region;
    this.getCities()
  }
  onDeselectRegion(region) {
    this.selectedRegion = null;
    this.getCities()
  }
  getCities () {
    var region = this.selectedRegion;
    if(region)
    {
      var element = Enumerable.from(this.allRegions)
                      .where((w) => { return w.departamento === region.value })
                      .firstOrDefault();
      if (element) {
        var cities = element.ciudades;
        var array = []
        cities.forEach(c => {
          array.push({ label: c, value: c});
        })
        this.cities = array;
      }
      
    }
    else {
      this.cities = []
    }
  }
  onSelectCity(city) {
    this.onBlur()
  }
  onDeselectCity(city) {
    this.onBlur()
  }

  getProductTypes () {
    this._orderService.getProductTypes()
        .subscribe(
          res => {
            var data = res.data;
            var array = [];
            data.forEach(d => {
              var option = { label: d.name, value: d.name }
              array.push(option)
            })
            this.productTypes = array;
          },
          error => {
            console.log(error)
          }
        )
  }



  onBlur() {
    var order = this.order;
    if(order.address && order.region && order.city)
      this.findCoords();
    else
      {
        this.lat = null; this.lng = null;
      }
  }
  // MAPA
  markerDragEnd(event) {
    console.log('markerDragEnd', { event })
    var coords = event.coords;
    this.lat = coords.lat;
    this.lng = coords.lng;
  }
  findCoords() {
    var address = this.order.address;
    var region = this.order.region;
    var city = this.order.city;
    var country = GLOBAL.country;
    console.log('find coords', { address, region, city, country })
    var completeAddress = `${address}+${city}+${region}+${country}`;
    this._mapService
      .getCoordinatesFromAddress(completeAddress)
      .subscribe(
        res => {
          console.log(res)
          if(res.status == 'OK')
          {
            var results = res.results;
            if(results)
            {
              var first = results[0];
              var geometry = first.geometry;
              var location = geometry.location;
              this.lat = location.lat;
              this.lng = location.lng;
            }
          }
          
        },
        error => console.log(error)
      )
  }

  // ITEMS
  onSubmitDetail() {
    this.addItem()
  }
  addItem() {
    if(this.item.quantity <= 0){
      this.errorMessageItems = 'Ingrese una cantidad válida';
      return;
    }
    this.errorMessageItems = null;
    var exists = Enumerable.from(this.items)
                  .where(w => { return w.productType === this.item.productType })
                  .firstOrDefault();
    if(exists) {
      exists.quantity = exists.quantity + this.item.quantity;
    } else {
      this.item.id = Math.random().toString(36).slice(2)
      this.items.push(this.item);
      var pt = this.item.productType;
      this.item = { quantity: 1, productType: pt }
    }
    
  }
  deleteItem(id: any) {
    this.items = this.items.filter((i) => { return i.id != id });
    console.log('item borrado', this.items)
  }
  
  // ORDER
  onSubmit() {
    console.log(this.items)
  }
}

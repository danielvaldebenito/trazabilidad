import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SelectsService } from '../../../services/selects.service';
import { UserService } from '../../../services/user.service';
import { OrderService } from '../../../services/order.service';
import { VehicleService } from '../../../services/vehicles.service';
import { AddressService } from '../../../services/addresses.service';
import { GoogleMapService } from '../../../services/googlemap.service';
import { SweetAlertService } from 'ng-sweetalert2-slc';
import { NotificationsService } from 'angular2-notifications';
import { ResolveEmit } from "@jaspero/ng2-confirmations/src/interfaces/resolve-emit";
import { IOption } from 'ng-select'
import { GLOBAL } from '../../../global';
import * as Enumerable from 'linq';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {

  regionName = GLOBAL.regionName;
  cityName = GLOBAL.cityName;
  // order
  order: any = { type: 'ENVASADO', commitmentDate: '04-07-2017' }
  // selects
  allRegions: any[]
  allPriceLists: any[]
  regions: Array<IOption> = []
  cities: Array<IOption> = []
  productTypes: Array<IOption> = []
  vehicles: Array<IOption> = []
  priceLists: Array<IOption> = []
  selectedRegion: any = {}
  selectedCity: any = {}
  selectedProductType: any = {}
  selectedPriceList: any = {}
  selectedPriceListName: string
  selectedVehicle: any = {}
  selectedPrices: any[] = []
  // items
  items: any[] = [];
  item: any = { quantity: 1 };
  totalToPay: number = 0;
  // MAPA
  placeId: any;
  zoom: number = 14;
  minZoom: number = 14;
  //maxZoom: number = 14;
  addresses: any[] = [];
  errorMessageItems: string

  constructor(
    private _selectsService: SelectsService,
    private _orderService: OrderService,
    private _mapService: GoogleMapService,
    private _notificationService: NotificationsService,
    private _addressService: AddressService,
    private _userService: UserService,
    private _vehicleService: VehicleService,
    private _location: Location,
    private _router: Router,
    private _swal2: SweetAlertService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getRegions();
    this.getProductTypes();
    this.getAddresses();
    this.getVehicles();
    this.getPriceLists();
    this.getDefaultData();
    
  }
  onCancel () {
    this._location.back();
  }
  getDefaultData() {
    var self = this;
    setTimeout(() => {
      var regionUser = self._userService.getRegionLocalUser();
      if (regionUser) {
        self.order.region = regionUser.value;
        self.selectedRegion = regionUser;
        var cityUser = self._userService.getCityLocalUser();
        console.log('city user', cityUser)
        if (cityUser) {
          self.getCities();
          self.order.city = cityUser.value;
          self.selectedCity = cityUser;
        }
      }
    }, 1000); 
  }
  // COMBOS
  getRegions() {
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
      },
      error => {

      }
      )
  }
  onSelectRegion(region) {
    this.selectedRegion = region;
    this.getCities()
  }
  onDeselectRegion(region) {
    this.selectedRegion = null;
    this.getCities()
  }
  getCities() {
    var region = this.selectedRegion;
    if (region) {
      var element = Enumerable.from(this.allRegions)
        .where((w) => { return w.departamento === region.value })
        .firstOrDefault();

      if (element) {
        var cities = element.ciudades;
        var array = []
        cities.forEach(c => {
          array.push({ label: c, value: c });
        })
        this.cities = array;
      }

    }
    else {
      this.cities = []
    }
  }
  onSelectCity(city) {
    this.selectedCity = city;
    this.onBlur()
  }
  onDeselectCity(city) {
    this.selectedCity = null;
    this.onBlur()
  }
  getPriceLists() {
    this._orderService.getPriceLists()
      .subscribe(
      res => {
        var data = res.data;
        this.allPriceLists = res.data;
        var array = [];
        data.forEach(d => {
          var option = { label: d.name, value: d._id }
          array.push(option)
        })
        this.priceLists = array;
      },
      error => {
        console.log(error)
      }
      )
  }
  onSelectPriceList (pl) {
    this.selectedPriceList = pl.value;
    this.selectedPriceListName = pl.label;
    this.order.priceList = pl.value;
    var selected = Enumerable.from(this.allPriceLists)
                    .where(w => { return w._id == pl.value })
                    .firstOrDefault ();
    this.selectedPrices = selected.items;
    this.updatePrices ();
  }
  onDeselectPriceList (pl) {
    this.selectedPriceList = null;
    this.updatePrices();
  }
  onCreatePriceList(pl) {
    console.log('recibiendo stored', pl)
    this.getPriceLists();
    var self = this;
    setTimeout(function() {
      self.selectedPriceList = pl._id;
      self.selectedPriceListName = pl.name;
      self.order.priceList = pl._id;
      self.selectedPrices = pl.items;
      self.updatePrices ();
    }, 500);
    

  }
  getVehicles() {
    this._selectsService.getVehicleToAsign(this.order.type)
      .subscribe(
        res => {
          if(res.done) {
            var data = res.data;
            data.forEach(d => { 
              var data = res.data;
              var array = [];
              data.forEach(d => {
                var option = { label: d.licensePlate, value: d._id }
                array.push(option)
              })
              this.vehicles = array;
            })
          }
        },
        error => {
          console.log(error)
        }
      )
  }
  onSelectVehicle (v) {
    this.selectedVehicle = v.value;
  }
  onDeselectVehicle (v) {
    this.selectedVehicle = null;
  }
  getProductTypes() {
    this._orderService.getProductTypes()
      .subscribe(
      res => {
        var data = res.data;
        var array = [];
        data.forEach(d => {
          var option = { label: d.name, value: d._id }
          array.push(option)
        })
        this.productTypes = array;
      },
      error => {
        console.log(error)
      }
      )
  }
  onSelectProductType (pt) {
    this.selectedProductType = pt.label;
  }
  onDeselectProductType (pt) {
    this.selectedProductType = null;
  }
  getAddresses() {
    this._addressService.getAddresses()
      .subscribe(
      res => {
        if (res.done) {
          var data = res.data.records;
          data.forEach(d => { this.addresses.push(d.location); })
        }
        console.log('direcciones', this.addresses)
      },
      error => {
        console.log(error)
      })
  }
  onBlur() {
    var order = this.order;
    if (order.address && order.region && order.city)
      this.findCoords();
    else {
      this.order.lat = null; this.order.lng = null;
    }
  }
  // MAPA
  markerDragEnd(event) {
    console.log('markerDragEnd', { event })
    var coords = event.coords;
    this.order.lat = coords.lat;
    this.order.lng = coords.lng;
    this.findAddress();
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
        if (res.status == 'OK') {
          var results = res.results;
          if (results) {
            var first = results[0];
            var geometry = first.geometry;
            this.order.placeId = first.place_id;
            var location = geometry.location;
            this.order.lat = location.lat;
            this.order.lng = location.lng;
          }
        }

      },
      error => console.log(error)
      )
  }
  findAddress() {
    this._mapService
      .getAddressFromCoordinates(this.order.lat, this.order.lng)
      .subscribe(
      res => {
        console.log(res)
        if (res.status == 'OK') {
          var results = res.results;
          var first =  results[0];
          this.order.placeId = first.place_id;
          var formatted_address = first.formatted_address;
          var split_formatted_addres = formatted_address.split(', ')
          this.order.address = split_formatted_addres[0];
          this.order.city = split_formatted_addres[1];
          
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
    if (this.item.quantity <= 0) {
      this.errorMessageItems = 'Ingrese una cantidad válida';
      return;
    }
    this.errorMessageItems = null;
    var exists = Enumerable.from(this.items)
      .where(w => { return w.productType === this.item.productType })
      .firstOrDefault();
    if (exists) {
      exists.quantity = exists.quantity + this.item.quantity;
      
    } else {
      this.item.id = Math.random().toString(36).slice(2);
      this.item.productTypeName = this.selectedProductType;
      this.items.push(this.item);
      var pt = this.item.productType;
      this.item = { quantity: 1, productType: pt, productTypeName: this.selectedProductType }
    }
    this.updatePrices();
  }
  updatePrices () {
    if(!this.items) return;
    this.totalToPay = 0;
    this.items.forEach(element => {
      element.price = this.getPrice (element)
      this.totalToPay = this.totalToPay + (element.price * element.quantity);
    });
  }
  getPrice(item: any) {
    if(!item) return 0;
    if(!this.selectedPriceList) return 0;
    var pt = item.productType;
    var pl = Enumerable.from(this.allPriceLists)
              .where(w => { return w._id == this.selectedPriceList })
              .firstOrDefault();
    
    if(!pl) return 0;
    var prices = []
    prices = pl.items;

    if(!prices) return 0;
    var price = Enumerable.from(prices)
                  .where(w => { return w.productType._id == pt})
                  .firstOrDefault ()

    if(!price) return 0;
    return price.price;
  }
  deleteItem(id: any) {
    this.items = this.items.filter((i) => { return i.id != id });
    this.updatePrices();
  }

  seeList(list) { 
    this._swal2.confirm({ title: 'Titulo', text: 'Message' })
          .then(
            res => console.log(res),
            cancel => { console.log(cancel) }
          )
  }

  searchClosest () {
    if(this.order.lat && this.order.lng) {
      var requestId = Math.random().toString(36).slice(2);
      //var requestId = '5hdx2znvohx'
      this._orderService
          .requestClosest(requestId, this.order.lat, this.order.lng)
          .subscribe(
            res => {
              if(res.done) {
                this._swal2.swal({
                  title: 'Buscando',
                  text: 'Buscando vehículos cercanos a ' + this.order.address + '... Espere por favor',
                  timer: 10000,
                  showCancelButton: true,
                  showConfirmButton: false,
                  cancelButtonText: 'Cancelar',
                  allowOutsideClick: false
                })
                .then(
                  res => console.log(res),
                  cancel => {
                    if (cancel == 'timer') { // Se agotó el tiempo de espera, es decir hay que buscar geo
                      this._orderService
                        .responseClosest(requestId)
                        .subscribe(
                          res => {
                            if(res.done) {
                              if(res.data) {
                                if(res.data.veh) {
                                  var licensePlate = res.data.veh.licensePlate;
                                  this._swal2.success({
                                      title: 'Vehículo encontrado',
                                      text: 'Se encontró el vehículo ' + licensePlate + ', como más cercano al destino señalado',
                                      confirmButtonText: 'Asignar'
                                    })
                                    .then(
                                      response => {
                                        console.log('res vehiculo encontrado', response)
                                        this.order.vehicle = res.data.veh._id;
                                      },
                                      cancel => {

                                      }
                                    )
                                }
                              } else {
                                this._swal2.confirm({
                                      title: 'Sin resultados',
                                      text: 'No se encontraron dispositivos. ¿Desea volver a intentarlo?',
                                      confirmButtonText: 'Reintentar',
                                      cancelButtonText: 'Cancelar'
                                    })
                                    .then(
                                      res => {
                                        this.searchClosest();
                                      },
                                      cancel => {

                                      }
                                    )
                              }
                            }
                          },
                          err => {
                            console.log(err)
                          }
                        )
                    }
                  }
                  )
              }
            },
            error => {

            })
      
    } else {
      this._swal2.warning ({
        title: 'Ingrese dirección',
        text: 'Para buscar vehículos cercanos, ingrese primeramente la dirección para el pedido'
      })
      .then(
        res => console.log(res),
        cancel => console.log(cancel)
      )
    }
    
    
  }

  // ORDER
  onSubmit() {
    console.log(this.items)
    if (this.items.length == 0) {
      this._notificationService.error('Error', 'Debe ingresar al menos 1 ítem');
      return;
    }

    var strItems = JSON.stringify(this.items);
    this.order.items = strItems;

    this._orderService.postOrder(this.order)
      .subscribe(res => {
        console.log(res);
        if(res.done){
          this.setDefaultData();
          
        } else {
          
        }
        
      }, error => console.log(error))

    
  }

  setDefaultData() {
    if (this.selectedRegion && this.selectedCity) {
      this._userService.setRegionLocalUser(this.selectedRegion);
      this._userService.setCityLocalUser(this.selectedCity);
    }

  }

  /*test modal*/
  open(content) {
    this.modalService.open(content, { size: 'lg' })
        .result.then((result) => {
          //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
  }
 

  // closeResult: string;
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }
}


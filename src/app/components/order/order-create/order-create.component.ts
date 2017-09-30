import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SelectsService } from '../../../services/selects.service';
import { UserService } from '../../../services/user.service';
import { ClientsService } from '../../../services/clients.service';
import { OrderService } from '../../../services/order.service';
import { VehicleService } from '../../../services/vehicles.service';
import { AddressService } from '../../../services/addresses.service';
import { GoogleMapService } from '../../../services/googlemap.service';
import { SweetAlertService } from 'ngx-sweetalert2'
import { NotificationsService } from 'angular2-notifications';
import { IOption } from 'ng-select';
import { GLOBAL } from '../../../global';
import * as Enumerable from 'linq';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { CompleterService, CompleterData, RemoteData } from 'ng2-completer';
import { Headers, RequestOptions } from '@angular/http'
import * as io from 'socket.io-client'
@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css'],
  providers: [SweetAlertService]
})
export class OrderCreateComponent implements OnInit {

  socket: any
  regionName = GLOBAL.regionName;
  cityName = GLOBAL.cityName;
  // order
  order: any = { type: 'ENVASADO', commitmentDate: '04-07-2017' };
  // selects
  allRegions: any[];
  allPriceLists: any[];
  regions: Array<IOption> = [];
  cities: Array<IOption> = [];
  productTypes: Array<IOption> = [];
  vehicles: Array<IOption> = [];
  priceLists: Array<IOption> = [];
  payMethods: Array<IOption> = [];
  selectedRegion: any = {};
  selectedCity: any = {};
  selectedProductType: any = {};
  selectedPriceList: any = {};
  selectedPriceListName: string;
  selectedVehicle: any = {};
  selectedPrices: any[] = [];
  selectedClient: any;
  selectedIndexAddress = 0;
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
  errorMessageItems: string;
  prev: boolean; next: boolean;
  // config 
  delaySearch: number = 10000 // 10 segundos
  protected searchStr: string;
  protected dataService: RemoteData;


  constructor(
    private _selectsService: SelectsService,
    private _orderService: OrderService,
    private _clientService: ClientsService,
    private _mapService: GoogleMapService,
    private _notificationService: NotificationsService,
    private _addressService: AddressService,
    private _userService: UserService,
    private _vehicleService: VehicleService,
    private _location: Location,
    private _router: Router,
    private _swal2: SweetAlertService,
    private modalService: NgbModal,
    private completerService: CompleterService
  ) {
    this.dataService = completerService
      .remote(null, null, 'fulldata');
    this.dataService.urlFormater(term => {
      return `${GLOBAL.apiUrl}clients/?filter=${term}&Authorization=${this._userService.getToken()}`
    })
    this.dataService.dataField('data')

    this.socket = io(GLOBAL.socketUrl + 'orders', { query: `distributor=${JSON.parse(localStorage.getItem('identity')).distributor._id}` });
  }

  ngOnInit() {
    this.getRegions();
    this.getProductTypes();
    this.getVehicles();
    this.getPriceLists();
    this.getDefaultData();
    this.getPayMethods();
  }
  addItem() {
    if (this.item.quantity <= 0) {
      this.errorMessageItems = 'Ingrese una cantidad válida';
      return;
    }
    var maxItemsOrder = GLOBAL.maxItemsOrder;
    if (this.items.length >= maxItemsOrder) {
      this._notificationService.error(`Ha ingresado la cantidad máxima de ítems permitidos (${maxItemsOrder})`);
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
      var discounts = [];
      if (this.selectedClient) {
        discounts = this.selectedClient.discountSurcharges
        var discountToProduct = Enumerable.from(discounts)
          .where(w => { return w.productType == this.item.productType })
          .firstOrDefault()

        this.item.discount = !discountToProduct ? 0 : discountToProduct.isDiscount ? discountToProduct.value : 0
        this.item.surcharge = !discountToProduct ? 0 : !discountToProduct.isDiscount ? discountToProduct.value : 0
      } else {
        this.item.discount = 0
        this.item.surcharge = 0
      }

      console.log('adding discount', this.item)
      this.items.push(this.item);
      var pt = this.item.productType;
      this.item = { quantity: 1, productType: pt, productTypeName: this.selectedProductType }
    }
    this.updatePrices();
  }
  onSearchClient(client) {
    console.log('selected client', client)
    if (!client) return;
    var obj = client.originalObject
    this.setClientObject(obj)
  }
  setClientObject(obj) {
    console.log('selected client obj', obj)
    this.order.location = obj.addresses && obj.addresses.length > 0 ? obj.addresses[0].location : ''
    this.order.region = obj.addresses && obj.addresses.length > 0 ? obj.addresses[0].region : ''
    this.selectedRegion = { label: this.order.region, value: this.order.region }
    this.order.client = obj._id
    this.order.clientName = obj.fullname
    this.order.phone = obj.phone
    this.order.clientNit = obj.nit
    this.getAddresses(obj._id);
    this.selectedClient = obj;
    this.getCities()
    setTimeout(() => {
      this.order.city = obj.addresses && obj.addresses.length > 0 ? obj.addresses[0].city : ''
      this.findCoords()
      this.searchStr = obj.fullname
    }, 100);
    this.prev = false
    this.next = obj.addresses.length > 1
    this.updateDiscountSurcharge()
    this.updatePrices()
  }
  deleteItem(id: any) {
    this.items = this.items.filter((i) => { return i.id != id });
    this.updatePrices();
  }
  findAddress() {
    this._mapService
      .getAddressFromCoordinates(this.order.lat, this.order.lng)
      .subscribe(
      res => {
        console.log(res)
        if (res.status == 'OK') {
          var results = res.results;
          var first = results[0];
          this.order.placeId = first.place_id;
          var formatted_address = first.formatted_address;
          var split_formatted_addres = formatted_address.split(', ')
          this.order.location = split_formatted_addres[0];
          this.order.city = split_formatted_addres[1];

        }
      },
      error => console.log(error)
      )
  }
  findCoords() {
    var address = this.order.location;
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
  getAddresses(client?: any) {
    this._addressService.getAddresses(client)
      .subscribe(
      res => {
        if (res.done) {
          var data = res.data.records;
          this.addresses = []
          data.forEach(d => { this.addresses.push(d.location); })
        }
        console.log('direcciones', this.addresses)
      },
      error => {
        console.log(error)
      })
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
  getPrice(item: any) {
    if (!item) return 0;
    if (!this.selectedPriceList) return 0;
    var pt = item.productType;
    var pl = Enumerable.from(this.allPriceLists)
      .where(w => { return w._id == this.selectedPriceList })
      .firstOrDefault();

    if (!pl) return 0;
    var prices = []
    prices = pl.items;

    if (!prices) return 0;
    var price = Enumerable.from(prices)
      .where(w => { return w.productType._id == pt })
      .firstOrDefault()

    if (!price) return 0;
    return price.price;
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
  getPayMethods() {
    this._selectsService.getPayMethods()
      .subscribe(
      res => {
        var data = res.data;
        var array = [];
        data.forEach(d => {
          var option = { label: d, value: d }
          array.push(option)
        })
        this.payMethods = array;
      },
      error => {
        console.log(error)
      }
      )
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

  getVehicles() {
    this._selectsService.getVehicleToAsign(this.order.type)
      .subscribe(
      res => {
        if (res.done) {
          this.vehicles = []
          this.order.vehicle = null
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
  markerDragEnd(event) {
    console.log('markerDragEnd', { event })
    var coords = event.coords;
    this.order.lat = coords.lat;
    this.order.lng = coords.lng;
    this.findAddress();
  }
  onBlur() {
    var order = this.order;
    if (order.address && order.region && order.city)
      this.findCoords();
    else {
      this.order.lat = null; this.order.lng = null;
    }
  }
  onCancel() {
    this._location.back();
  }
  onCreatePriceList(pl) {
    console.log('recibiendo stored', pl)
    this.getPriceLists();
    var self = this;
    setTimeout(function () {
      self.selectedPriceList = pl._id;
      self.selectedPriceListName = pl.name;
      self.order.priceList = pl._id;
      self.selectedPrices = pl.items;
      self.updatePrices();
    }, 500);


  }
  onDeselectCity(city) {
    this.selectedCity = null;
    this.onBlur()
  }
  onDeselectPriceList(pl) {
    this.selectedPriceList = null;
    this.updatePrices();
  }
  onDeselectProductType(pt) {
    this.selectedProductType = null;
  }
  onDeselectRegion(region) {
    this.selectedRegion = null;
    this.getCities()
  }
  onDeselectVehicle(v) {
    this.selectedVehicle = null;
  }
  onSelectCity(city) {
    this.selectedCity = city;
    this.onBlur()
  }
  onChangeType(data) {
    this.order.type = data;
    this.getVehicles();
  }
  onSelectPriceList(pl) {
    this.selectedPriceList = pl.value;
    this.selectedPriceListName = pl.label;
    this.order.priceList = pl.value;
    var selected = Enumerable.from(this.allPriceLists)
      .where(w => { return w._id == pl.value })
      .firstOrDefault();
    this.selectedPrices = selected.items;
    this.updatePrices();
  }
  onSelectProductType(pt) {
    this.selectedProductType = pt.label;
  }
  onSelectRegion(region) {
    this.selectedRegion = region;
    this.getCities()
  }
  onSelectVehicle(v) {
    this.selectedVehicle = v.value;
  }
  onSubmit() {
    console.log(this.items)
    if (this.items.length == 0) {
      this._notificationService.error('Error', 'Debe ingresar al menos 1 ítem');
      return;
    }
    this.order.items = this.items;

    this._orderService.postOrder(this.order)
      .subscribe(res => {
        console.log(res);
        if (res.done) {
          //this.socket.emit('new-order', res.stored)
          this._swal2.success({
            title: 'Ingresado',
            text: res.message
          })
            .then(
            ok => this.onCancel(),
            no => this.onCancel()
            )
          this.setDefaultData();

        } else {
          this._swal2.error({
            title: 'Error',
            text: res.message
          }).then(ok => this.onCancel(), no => this.onCancel())
        }

      }, error => {
        console.log(error)
        this._swal2.error({
          title: 'Error',
          text: 'Ha ocurrido un error'
        }).then(ok => this.onCancel(), no => this.onCancel())
      })


  }
  onSubmitDetail() {
    this.addItem()
  }
  open(content) {
    this.modalService.open(content, { size: 'lg' })
      .result.then((result) => {
        //this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }
  searchClosest() {
    if (this.order.lat && this.order.lng) {
      var requestId = Math.random().toString(36).slice(2);
      //var requestId = '5hdx2znvohx'

      this._orderService
        .requestClosest(requestId, this.order.lat, this.order.lng)
        .subscribe(
        res => {
          if (res.done) {
            this._swal2.swal({
              title: 'Buscando',
              text: 'Buscando vehículos cercanos a ' + this.order.location + '... Espere ' + this.delaySearch / 1000 + ' segundos por favor',
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
                      if (res.done) {
                        if (res.data) {
                          if (res.data.veh) {
                            var licensePlate = res.data.veh.licensePlate;
                            this._swal2.success({
                              title: 'Vehículo encontrado',
                              text: 'Se encontró el vehículo ' + licensePlate + ', como más cercano al destino señalado',
                              confirmButtonText: 'Asignar'
                            })
                              .then(
                              response => {
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
                      console.log(err);
                    }
                    )
                }
              }
              )
          }
        },
        error => {
          console.log('error', error);
        })

    } else {
      this._swal2.warning({
        title: 'Ingrese dirección',
        text: 'Para buscar vehículos cercanos, ingrese primeramente la dirección para el pedido'
      })
        .then(
        res => console.log(res),
        cancel => console.log(cancel)
        )
    }


  }
  seeList(list) {
    this._swal2.confirm({ title: 'Titulo', text: 'Message' })
      .then(
      res => console.log(res),
      cancel => { console.log(cancel) }
      )
  }
  setDefaultData() {
    if (this.selectedRegion && this.selectedCity) {
      this._userService.setRegionLocalUser(this.selectedRegion);
      this._userService.setCityLocalUser(this.selectedCity);
    }

  }
  updateDiscountSurcharge() {
    this.items.forEach(element => {
      var discounts = []
      if (this.selectedClient) {
        discounts = this.selectedClient.discountSurcharges
        var discountToProduct = Enumerable.from(discounts)
          .where(w => { return w.productType == element.productType })
          .firstOrDefault()

        element.discount = !discountToProduct ? 0 : discountToProduct.isDiscount ? discountToProduct.value : 0
        element.surcharge = !discountToProduct ? 0 : !discountToProduct.isDiscount ? discountToProduct.value : 0
      } else {
        element.discount = 0
        element.surcharge = 0
      }
    });
  }
  updatePrices() {
    if (!this.items) return;
    this.totalToPay = 0;
    this.items.forEach(element => {

      element.price = this.getPrice(element)
      console.log('updating prices', { price: element.price, surcharge: element.surcharge, discount: element.discount })
      this.totalToPay = this.totalToPay + ((element.price + element.surcharge - element.discount) * element.quantity);
    });
  }
  onCreateNewClient(client) {
    this.setClientObject(client)
  }
  resetClient() {
    this.selectedClient = null;
    this.order.clientName = null;
    this.order.clientNit = null;
    this.order.location = null;
    this.order.lat = null;
    this.order.lng = null;
    this.order.client = null;
    this.order.region = null;
    this.order.city = null;
    this.order.phone = null;
    this.order.placeId = null;
    this.searchStr = null;
    this.prev = false;
    this.next = false;
    this.updateDiscountSurcharge()
    this.updatePrices()
  }
  newClientQuick() {
    console.log('new client quick')
    if (!this.order.lat || !this.order.lng) {
      this._notificationService.error('Error', 'Ingrese una dirección correcta');
      return;
    }
    var client = {
      nit: this.order.clientNit,
      name: this.order.clientName || 'NN',
      location: this.order.location,
      city: this.order.city,
      region: this.order.region,
      phone: this.order.phone
    }
    this._clientService.postClientsQuick(client)
      .subscribe(res => {
        console.log(res)
        if (res.done) {
          this.setClientObject(res.stored)
          this._notificationService.success('OK', res.message)
        } else {
          this._notificationService.error('Error', res.message)
        }

      }, error => {
        this._notificationService.error('Error', 'Ha ocurrido un error')
      })

  }
  onSelectClient(client) {
    if (!client) return;
    this.setClientObject(client)
  }
  onBlurNit() {
    var nit = this.order.clientNit
    this._clientService.getOneClientByNit(nit)
      .subscribe(res => {
        if(res.done) {
          if(res.client)
            this.setClientObject(res.client)
        }
      }, error => console.log(error))
  }
  choiceAddress(index) {
    this.selectedIndexAddress = this.selectedIndexAddress + index;
    this.prev = this.selectedIndexAddress == this.selectedClient.addresses.length - 1
    this.next = this.selectedIndexAddress == 0
    var address = this.selectedClient.addresses[this.selectedIndexAddress]
    console.log('address selected', address, this.selectedIndexAddress)
    if(address) {
      this.order.location = address.location
      this.order.region = address.region
      this.selectedRegion = { label: this.order.region, value: this.order.region }
      this.getCities()
      setTimeout(() => {
        this.order.city = address.city
        this.findCoords()
      }, 100);
    }
  }
}


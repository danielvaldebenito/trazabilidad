import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms'
import { SelectsService } from '../../../services/selects.service'
import { ClientsService } from '../../../services/clients.service'
import { OrderService } from '../../../services/order.service'
import { GLOBAL } from '../../../global'
import * as Enumerable from 'linq'
import { IOption } from "ng-select";
import { SweetAlertService } from 'ngx-sweetalert2'
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-clients-edit',
  templateUrl: './clients-edit.component.html',
  styleUrls: ['./clients-edit.component.css']
})
export class ClientsEditComponent implements OnInit {
  form: FormGroup
  cityName = GLOBAL.cityName
  regionName = GLOBAL.regionName
  regions: Array<IOption>
  allRegions: any[]
  selectedRegion: any
  selectedCity: any
  cities: any[]
  id: string
  disAndSur: any[]
  productTypes: any[]
  client: any

  @Input() fromModal: boolean = false
  @Output() submitForm = new EventEmitter ();
  get discountSurcharges() { return this.form.get('discountSurcharges') as FormArray; }
  constructor(
    private _fb: FormBuilder,
    private _selectsService: SelectsService,
    private _clientsService: ClientsService,
    private _os: OrderService,
    private _swal2: SweetAlertService,
    private _location: Location,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getRegions()
    this.id = this._route.snapshot.params['id']
    this.getOne (this.id);
    this.getProductTypes ()
  }
  getOne (id: string) {
    this._clientsService.getOneClient(id)
        .subscribe(res => {
          if(res.done) {
            this.selectedRegion = { value: res.client.region, label: res.client.region } 
            this.getCities()
            this.client = res.client
            this.initForm (res.client)
          }
        }, error => this.onCancel())
  }
  initForm (client) {
    

    this.form = this._fb.group({
      nit: [client.nit, Validators.required],
      name: [client.name, Validators.required],
      surname: [client.surname],
      phone: [client.phone],
      address: [client.address, Validators.required],
      region: [client.region, Validators.required],
      city: [client.city, Validators.required],
      contact: [client.contact, Validators.required],
      email: [client.email, Validators.email],
      discountSurcharges: this._fb.array([

      ])
    })
    
  }
  addDiscountSurcharge (pt) {
    var state: boolean = false
    var disSur = []
    disSur = this.client.discountSurcharges
    var das = Enumerable.from(disSur)
                  .where(w => { return w.productType == pt._id })
                  .firstOrDefault()
    
    var group: FormGroup
    group = this._fb.group({
      productType: [ pt._id ],
      productTypeName: [{ value: pt.name, disabled: true }],
      isDiscount: [ das ? das.isDiscount : false ],
      value: [ das ? das.value : 0, Validators.required ]
    })
    
    this.discountSurcharges.push(group)
  }

  getProductTypes () {
    this._os.getProductTypes()
        .subscribe(
          res => {
            if(res.done){
              this.productTypes = res.data
              this.productTypes.forEach(f => { this.addDiscountSurcharge(f) })
            }
          },
          error => {
            console.log(error)
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
  onSelectCity(city) {
    this.selectedCity = city;
  }
  onDeselectCity(city) {
    this.selectedCity = null;
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
  onCancel() {
    this._location.back()
  }
  onSubmit() {
    this._clientsService.updateClient(this.id, this.form.value)
        .subscribe(res => {
          if(res.done) {
            this._swal2.success({
              title: 'Modificación Correcta',
              text: res.message,
              confirmButtonText: 'LISTO'
            })
            .then(yes => {
              if(!this.fromModal) {
                this.onCancel()
              } else {
                this.submitForm.emit()
              }
            }, no => {
              if(!this.fromModal) {
                this.onCancel()
              } else {
                this.submitForm.emit()
              }
              
            })
          } else {
            this._swal2.error({
              title: 'Error',
              text: res.message
            })
          }
        }, error => {
          var body = error._body
          if(body) {
            var jsBody = JSON.parse(body)
            var err = jsBody.error
            var code = err.code
            if(code == 11000) {
              this._swal2.error({
                title: 'Error',
                text: 'El NIT ingresado ya existe en el sistema'
              })
            }
          }
          
        })
  }
}

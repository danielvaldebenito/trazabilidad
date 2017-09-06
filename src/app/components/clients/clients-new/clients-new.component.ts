import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms'
import { SelectsService } from '../../../services/selects.service'
import { ClientsService } from '../../../services/clients.service'
import { OrderService } from '../../../services/order.service'
import { GLOBAL } from '../../../global'
import * as Enumerable from 'linq'
import { IOption } from "ng-select";
import { SweetAlertService } from 'ngx-sweetalert2'
import { Location } from '@angular/common'


@Component({
  selector: 'app-clients-new',
  templateUrl: './clients-new.component.html',
  styleUrls: ['./clients-new.component.css']
})
export class ClientsNewComponent implements OnInit {
  form: FormGroup
  cityName = GLOBAL.cityName
  regionName = GLOBAL.regionName
  regions: Array<IOption>
  allRegions: any[]
  selectedRegion: any
  selectedCity: any
  cities: any[]
  productTypes: any[]
  errorNit: boolean = false
  @Input() fromModal: boolean = false
  @Output() submitForm = new EventEmitter<any> ();
  get discountSurcharge() { return this.form.get('discountSurcharge') as FormArray; }
  constructor(
    private _fb: FormBuilder,
    private _selectsService: SelectsService,
    private _clientsService: ClientsService,
    private _swal2: SweetAlertService,
    private _location: Location,
    private _os: OrderService
  ) { }

  ngOnInit() {
    this.getRegions()
    this.initForm ()
    this.getProductTypes()
  }
  initForm () {
    this.form = this._fb.group({
      nit: [null, Validators.required],
      name: [null, Validators.required],
      surname: [null],
      phone: [null],
      email: [null, Validators.email],
      address: [null, Validators.required],
      region: [null, Validators.required],
      city: [null, Validators.required],
      contact: [null, Validators.required],
      discountSurcharge: this._fb.array([

      ])
    })
  }
  addDiscountSurcharge (productType) {
    this.discountSurcharge.push(this._fb.group({
      productType: productType._id,
      productTypeName: [ {value: productType.name, disabled: true}],
      isDiscount: true,
      value: [0, Validators.required]
    }))
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
  getProductTypes () {
    this._os.getProductTypes()
        .subscribe(
          res => {
            if(res.done)
              this.productTypes = res.data
              this.productTypes.forEach(f => { this.addDiscountSurcharge(f) })
          },
          error => {
            console.log(error)
          }
        )
  }
  onCancel() {
    this._location.back()
  }
  validateNit() {
    this._clientsService.validateNit(this.form.get('nit').value)
        .subscribe(res => {
          this.errorNit = res.exists
        }, error => {
          this.errorNit = false
        })
  }
  onSubmit() {
    this._clientsService.postClients(this.form.value)
        .subscribe(res => {
          if(res.done) {
            this._swal2.success({
              title: 'Ingreso Correcto',
              text: res.message,
              showCancelButton: !this.fromModal,
              confirmButtonText: 'LISTO',
              cancelButtonText: 'NUEVO'
            })
            .then(yes => {
              if(!this.fromModal) {
                this.onCancel()
              } else {
                this.submitForm.emit(res.stored)
              }
            }, no => {
              if(!this.fromModal) {
                this.form.reset()
              } else {
                this.submitForm.emit(res.stored)
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

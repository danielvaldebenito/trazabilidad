import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SweetAlertService } from 'ngx-sweetalert2'
import { Location } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { SelectsService } from '../../../services/selects.service'
import { PriceListService } from '../../../services/price-list.service';
import { IOption } from 'ng-select';
import * as Enumerable from 'linq'
import { GLOBAL } from '../../../global'
@Component({
  selector: 'app-price-list-new',
  templateUrl: './price-list-new.component.html',
  styleUrls: ['./price-list-new.component.css'],
  providers: [SweetAlertService]
})
export class PriceListNewComponent implements OnInit {
  @Input() fromModal: boolean = false;
  @Output() onSubmitForm = new EventEmitter<string>()
  plForm: FormGroup
  productTypes : any[] = []
  allRegions: any [] = [];
  regions: Array<IOption>;
  selectedRegion: any;
  selectedCity: any;
  cities: Array<IOption>;
  regionName = GLOBAL.regionName
  cityName = GLOBAL.cityName
  get items() { return this.plForm.get('items') as FormArray; }
  constructor(
    private fb: FormBuilder, 
    private _os: OrderService,
    private _plService: PriceListService,
    private _swal2: SweetAlertService,
    private _location: Location,
    private _selectsService: SelectsService
  ) {
    
    this.plForm = this.fb.group({
      name: [null, Validators.required],
      region: [null, Validators.required],
      city: [null, Validators.required],
      items: this.fb.array([
      ])
    })
    this.getProductTypes();
    this.getRegions();
  }
  addProduct(pt: any) {
    this.items.push(this.fb.group({
      productType: pt._id,
      pt: [{value: pt.name, disabled: true}, Validators.required],
      price: [0, Validators.required]
    }));
  }
  getProductTypes () {
    this._os.getProductTypes()
        .subscribe(
          res => {
            if(res.done)
              this.productTypes = res.data
              this.productTypes.forEach(f => { this.addProduct(f) })
              
          },
          error => {
            console.log(error)
          }
        )
  }
  ngOnInit() {
  }

  onSubmit() {
    var json = this.plForm.value;
    this._plService.postPriceList(json)
        .subscribe(
          res => {
            if(res.done) {
              this._swal2.success({
                title: 'OK',
                text: res.message
              })
              .then(
                response => {
                  if(!this.fromModal)
                    this._location.back()
                  console.log('enviando stored', res.stored)
                  this.onSubmitForm.emit(res.stored);
                }
              )
            } else
              console.log(res.message)
          },
          err => console.log(err)
        )
  }
  onCancel() {
    this._location.back()
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
  getCities() {
    const region = this.selectedRegion;
    if (region) {
      let element = Enumerable.from(this.allRegions)
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
  onSelectRegion(region) {
    this.selectedRegion = region;
    this.getCities()
  }
  onDeselectRegion(region) {
    this.selectedRegion = null;
    this.getCities()
  }
  onSelectCity(city) {
  }
  onDeselectCity() {
  }
}

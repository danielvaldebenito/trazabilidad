import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SweetAlertService } from 'ngx-sweetalert2'
import { Location } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { PriceListService } from '../../../services/price-list.service';
import {SelectsService} from '../../../services/selects.service'
import { ActivatedRoute } from "@angular/router";
import { IOption } from 'ng-select';
import {GLOBAL} from '../../../global'
import * as Enumerable from 'linq'
@Component({
  selector: 'app-price-list-edit',
  templateUrl: './price-list-edit.component.html',
  styleUrls: ['./price-list-edit.component.css'],
  providers: [SweetAlertService]
})
export class PriceListEditComponent implements OnInit {

  plForm: FormGroup
  productTypes : any[] = []
  id: string
  allRegions: any [] = [];
  regions: Array<IOption>;
  selectedRegion: any;
  selectedCity: any;
  cities: Array<IOption>;
  regionName = GLOBAL.regionName
  cityName = GLOBAL.cityName
  priceList: any
  get items() { return this.plForm.get('items') as FormArray; }
  constructor(
    private fb: FormBuilder, 
    private _os: OrderService,
    private _plService: PriceListService,
    private _swal2: SweetAlertService,
    private _location: Location,
    private _route: ActivatedRoute,
    private _selectsService: SelectsService
  ) {
    this.getRegions();
    this.plForm = this.fb.group({
      name: [null, Validators.required],
      region: [null, Validators.required],
      city: [null, Validators.required],
      items: this.fb.array([
      ])
    })

    this.id = this._route.snapshot.params["id"];
    this.getOne (this.id)
      .then(pl => {
        const record = this.priceList;
        const items = record.items;
        this.plForm.get('name').setValue(record.name);
        this.plForm.get('region').setValue(record.region);
        this.selectedRegion = { value: record.region, label: record.region }
        this.onSelectRegion(this.selectedRegion);
        this.plForm.get('city').setValue(record.city)
        items.forEach(i => {
          this.addProduct(i)
        });
      });
  }
  getOne (id) {
    return new Promise((resolve, reject) => {
      this._plService.getOnePriceList(id)
      .subscribe(res => {
        if(res.done) { 
          this.priceList = res.record;
          resolve(res.record)
        } else {
          reject(res.message)
        }
      } , e => reject(e))
    })

  }
  addProduct(pt: any) {
    this.items.push(this.fb.group({
      itemId: pt._id,
      productType: pt.productType._id,
      pt: [{value: pt.productType.name, disabled: true}, Validators.required],
      price: [pt.price, Validators.required]
    }));
  }

  ngOnInit() {
  }

  onSubmit() {
    var json = this.plForm.value;
    this._plService.updatePriceList(this.id, json)
        .subscribe(
          res => {
            if(res.done) {
              this._swal2.success({
                title: 'OK',
                text: res.message
              })
              .then(
                response => {
                  this._location.back()
                }
              )
            } else
              console.log(res.message)
          },
          err => console.log(err)
        )
  }

  onCancel() {
    this._location.back();
    
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
  async onSelectRegion(region) {
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

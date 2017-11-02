import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { GLOBAL } from '../../../global';
import { SelectsService } from '../../../services/selects.service'
import { DistributorsService } from '../../../services/distributors.service'
import * as Enumerable from 'linq'
import { SweetAlertService } from 'ngx-sweetalert2'
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-distributors-edit',
  templateUrl: './distributors-edit.component.html',
  styleUrls: ['./distributors-edit.component.css']
})
export class DistributorsEditComponent implements OnInit {

  id: string;
  allRegions: any[];
  form: FormGroup
  regionName = GLOBAL.regionName
  cityName = GLOBAL.cityName
  regions: any[] = []
  cities: any[] = []
  selectedRegion: any
  selectedCity: any
  regionsArray: any[] = []
  citiesArray: any[] = []
  distributor: any
  get deliveryLocations() { return this.form.get('deliveryLocations') as FormArray; }
  constructor(
    private _fb: FormBuilder,
    private _selectsService: SelectsService,
    private _distributorService: DistributorsService,
    private _swal2: SweetAlertService,
    private _location: Location,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this._route.snapshot.params['id']
    this.getRegions()
    this.getOne (this.id)
      .then(dist => {
        this.selectedRegion = { value: this.distributor.region, label: this.distributor.region }
        this.onSelectRegion(this.selectedRegion)
        this.initForm(dist)
      }, error => {
        console.log(error)
      })
    
  }
  getOne (id) {
    return new Promise((resolve, reject) => {
      this._distributorService.getOne(id)
      .subscribe(res => {
        if(res.done){
          this.distributor = res.record
          resolve(res.record)
        }
        else
          reject(new Error(res.message))
        
      }, error => {
        reject(error)
      })
    })
    
  }
  initForm(distributor) {

    this.form = this._fb.group({
      nit: [ distributor.nit, Validators.required ],
      name: [ distributor.name, Validators.required ],
      contact: [ distributor.contact, Validators.required ],
      phone: [ distributor.phone, Validators.required ],
      email: [ distributor.email, Validators.email ],
      address: [distributor.address, Validators.required ],
      city: [distributor.city, Validators.required],
      region: [distributor.region, Validators.required],
      deliveryLocations: this._fb.array([
        
      ])
    })

    this.addDeliveryLocations(distributor);
  }
  addDeliveryLocations(distributor) {
    const dl = distributor.deliveryLocations;
    console.log('dl', dl)
    dl.forEach((element, index) => {
      this.regionsArray[index] = { value: element.region }
      this.getCities2(index);
      this.deliveryLocations.push(this.initDeliveryLocation(element))
    });
  } 
  initDeliveryLocation(dl) {
    return this._fb.group({
      region: [dl.region, Validators.required],
      city: [dl.city, Validators.required]
    })
  }

  addDeliveryLocation() {
    const control = <FormArray>this.form.controls['deliveryLocations'];
    control.push(this.initDeliveryLocation({region: null, city: null}))
  }
  removeDeliveryLocation(i: number) {
    // remove address from the list
    const control = <FormArray>this.form.controls['deliveryLocations'];
    control.removeAt(i);
  }
  async getRegions() {
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
  // onDeselectCity(city) {
  //   this.selectedCity = null;
  //   this.onBlur()
  // }
  onDeselectRegion(region) {
    this.selectedRegion = null;
    this.getCities()
  }
  // onSelectCity(city) {
  //   this.selectedCity = city;
  //   this.onBlur()
  // }
  async onSelectRegion(region) {
    this.selectedRegion = region;
    this.getCities()
  }

  async onSelectRegion2(region, index) {
    this.regionsArray[index] = region
    this.getCities2(index)
  }
  onDeselectRegion2(region, index) {
    this.regionsArray[index] = null;
    this.getCities2(index)
  }
  async getCities2(index) {
    const region = this.regionsArray[index];
    console.log('getcities 2', region)
    if (region) {
      const element = Enumerable.from(this.allRegions)
        .where((w) => { return w.departamento === region.value })
        .firstOrDefault();

      if (element) {
        const cities = element.ciudades;
        const array = []
        cities.forEach(c => {
          array.push({ label: c, value: c });
        })
        this.citiesArray[index] = array;
      }
    }
    else {
      this.citiesArray[index] = []
    }
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

  onSubmit () {
    this._distributorService.update(this.id, this.form.value)
      .subscribe(res => {
        if(res.done) {
          this._swal2.success({
            title: 'Actualizado',
            text: res.message
          }).then(ok => this.onCancel(), cancel => this.onCancel())
        } else {
          
        }
      }, err => {
        var body = err._body
        if(body) {
          var jsBody = JSON.parse(body)
          var err = jsBody.error
          var code = err.code
          if(code == 11000) {
            this._swal2.error({
              title: 'Error',
              text: 'El NIT o el nombre ingresado ya existe en el sistema, intente nuevamente'
            })
          }
        }
      })
  }

  onCancel() {
    this._location.back()
  }
}

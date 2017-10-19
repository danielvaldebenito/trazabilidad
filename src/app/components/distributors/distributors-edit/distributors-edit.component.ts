import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    this.getOne (this.id);
    this.getRegions()
    
  }
  getOne (id) {
    this._distributorService.getOne(id)
      .subscribe(res => {
        console.log(res);
        this.selectedRegion = { value: res.record.region, label: res.record.region }
        this.getCities()
        const self = this
        setTimeout(function() {
          self.initForm(res.record)
        }, 500);
        
      }, error => {
        console.log(error);
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
      region: [distributor.region, Validators.required]
    })
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
  onSelectRegion(region) {
    this.selectedRegion = region;
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

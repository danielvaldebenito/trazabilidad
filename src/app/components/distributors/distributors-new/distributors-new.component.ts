import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GLOBAL } from '../../../global';
import { SelectsService } from '../../../services/selects.service'
import { DistributorsService } from '../../../services/distributors.service'
import * as Enumerable from 'linq'
import { SweetAlertService } from 'ngx-sweetalert2'
import { Location } from '@angular/common'
@Component({
  selector: 'app-distributors-new',
  templateUrl: './distributors-new.component.html',
  styleUrls: ['./distributors-new.component.css']
})
export class DistributorsNewComponent implements OnInit {
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
    private _location: Location
  ) { }

  ngOnInit() {
    this.getRegions()
    this.initForm();
  }

  initForm() {
    this.form = this._fb.group({
      nit: [ null, Validators.required ],
      name: [ null, Validators.required ],
      contact: [ null, Validators.required ],
      phone: [ null, Validators.required ],
      email: [ null, Validators.email ],
      address: [null, Validators.required ],
      city: [null, Validators.required],
      region: [null, Validators.required]
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
    this._distributorService.post(this.form.value)
      .subscribe(res => {
        if(res.done) {
          this._swal2.success({
            title: 'Registrado',
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

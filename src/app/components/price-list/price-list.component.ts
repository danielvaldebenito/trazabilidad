import { Component, OnInit, Input } from '@angular/core';
import { PriceListService } from '../../services/price-list.service';
import { SelectsService } from '../../services/selects.service'
import { GLOBAL } from '../../global'
import { IOption } from 'ng-select';
import * as Enumerable from 'linq'
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})

export class PriceListComponent implements OnInit {
  regionName = GLOBAL.regionName;
  cityName = GLOBAL.cityName;
  priceLists : any [] = [];
  allRegions: any [] = [];
  regions: Array<IOption>;
  selectedRegion: any;
  selectedCity: any;
  cities: Array<IOption>;
  region: any;
  city: any;
  filterForm: FormGroup
  constructor(
    private _priceListService: PriceListService,
    private _selectsService: SelectsService,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getRegions();
    this.initFormFilter();
    this.getPriceLists();
  }
  initFormFilter () {
    this.filterForm = this._fb.group({
      region: [''],
      city: ['']
    })
    
  }
  getPriceLists () {
    this._priceListService.getPriceLists(this.filterForm.value.city, this.filterForm.value.region)
        .subscribe(
          res => {
            if(res.done) {
              const data = res.data;
              this.priceLists = data;
            }
          },
          error => console.log(error)
        )
  }
  onDelete() {
    this.getPriceLists();
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
    this.refresh();
  }
  onDeselectRegion(region) {
    this.selectedRegion = null;
    this.getCities()
    this.refresh();
  }
  onSelectCity(city) {
    this.refresh();
  }
  onDeselectCity() {
    this.refresh();
  }
  refresh () {
    this.getPriceLists();
  }
}

import { Component, OnInit } from '@angular/core';
import { VehicleService} from '../../services/vehicles.service';
import { Vehicle } from '../../models/vehicle.model';
import { PagerService } from '../../services/pager.service';
import * as _ from 'underscore';
@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {
  // array of all items to be paged
  private allItems: any[];
  currentPage: number = 1;
  total: number = 0;
  limit: number = 4;
  filter: string = '';
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  constructor(private _vehicleService: VehicleService, private pagerService: PagerService) { }

  ngOnInit() {
    this.getVehicles('', this.limit);
  }
  getVehicles(filter: string, limit: number){
    this._vehicleService
        .getVehicles(filter, limit, this.currentPage)
        .subscribe(
          res => {
            if(res.done){
              this.allItems = res.data;
              console.log(this.allItems)
              this.total = res.total;
              this.pager = this.pagerService.getPager(this.total, this.currentPage, limit);
              console.log('pager', this.pager)
            }
          },
          error => console.log(error))
  }
  setPage(page: number) {
      this.currentPage = page;
      this.getVehicles(this.filter, this.limit);
  }
  onKey (value: string) {
    this.filter = value;
    this.getVehicles(this.filter, this.limit)
  }
}

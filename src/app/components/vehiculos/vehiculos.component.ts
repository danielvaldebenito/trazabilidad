import { Component, OnInit } from '@angular/core';
import { VehicleService} from '../../services/vehicles.service';
import { Vehicle } from '../../models/vehicle.model';
import { PagerService } from '../../services/pager.service';
import { ConfirmationComponent, ConfirmationService } from '@jaspero/ng2-confirmations'
import { ResolveEmit } from "@jaspero/ng2-confirmations/src/interfaces/resolve-emit";
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
  constructor(
    private _vehicleService: VehicleService, 
    private pagerService: PagerService,
    private _confirmService: ConfirmationService
  ) 
  { }

  ngOnInit() {
    this.refresh();
  }
  getVehicles(filter: string, limit: number){
    this._vehicleService
        .getVehicles(filter, limit, this.currentPage)
        .subscribe(
          res => {
            if(res.done){
              this.allItems = res.data;
              this.total = res.total;
              this.pager = this.pagerService.getPager(this.total, this.currentPage, limit);
            }
          },
          error => console.log(error))
  }
  setPage(page: number) {
      this.currentPage = page;
      this.refresh();
  }
  onKey (value: string) {
    this.filter = value;
    this.refresh();
  }
  tryDelete (id) {
    this._confirmService.create('Eliminar registro', '¿Está seguro que desea eliminar este vehículo?')
        .subscribe((ans: ResolveEmit) => {
          if(ans.resolved)
            this.deleteRecord(id);
        })
  }
  deleteRecord (id) {
    this._vehicleService.deleteVehicle(id)
      .subscribe(res => {
        this.refresh()
      }, e => console.log(e))
  }
  refresh() {
    this.getVehicles(this.filter, this.limit);
  }
}

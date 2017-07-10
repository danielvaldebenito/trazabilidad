import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from '../../../services/vehicles.service';
import { SelectsService } from '../../../services/selects.service';
import { NotificationsService } from 'angular2-notifications';
import { Location } from '@angular/common';
@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent implements OnInit {

  id: string;
  private sub: any;
  vehicle: any = {};
  vehicleTypes: any[];
  constructor(
    private _route: ActivatedRoute,
    private _vehicleService: VehicleService,
    private _selectService: SelectsService,
    private _location: Location,
    private _notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.getVehicleTypes();
    this.sub = this._route.params.subscribe(params => {
       this.id = params['id'];
       this.getVehicle(this.id);
    });
  }

  onCancel () {
    this._location.back();
  }
  getVehicleTypes () {
    this._selectService.getVehicleTypes()
        .subscribe(
          res => this.vehicleTypes = res.data,
          error => console.log(error)
        )
  }
  getVehicle (id) {
    this._vehicleService.getOneVehicle(id)
        .subscribe(
          res => {
            if(res.done)
              this.vehicle = res.record;
          },
          err => console.log('error' , err));
  }
  onSubmit(){
    this._vehicleService.updateVehicle(this.id, this.vehicle)
        .subscribe(res => {
          console.log(res);
          this._location.back();
        }, 
          error => {
            console.log(err);
            if(error.status == 500) {
              var body = error._body;
              if(body) {
                var jsonBody = JSON.parse(body);
                var err = jsonBody.error
                var codeError = err.code;
                if(codeError == 11000)
                  console.log('Ya se encuentra una placa "' + this.vehicle.licensePlate +  '" en el sistema')
                else
                  console.log(body.message)
              }
            }
          });
  }

}

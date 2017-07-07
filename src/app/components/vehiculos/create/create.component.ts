import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../services/vehicles.service';
import { SelectsService } from '../../../services/selects.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateVehicleComponent implements OnInit {

  vehicle: any = {}
  vehicleTypes: any[];
  errorMessage: string;
  successMessage: string;
  constructor(
    private _selectService: SelectsService, 
    private _location: Location,
    private _vehicleService: VehicleService) {
    
   }

  ngOnInit() {
    this.getVehicleTypes();
  }

  getVehicleTypes () {
    this._selectService.getVehicleTypes()
        .subscribe(
          res => this.vehicleTypes = res.data,
          error => console.log(error)
        )
  }
  
  onCancel () {
    this._location.back();
  }
  onChange() {
    this.errorMessage = null;
  }
  onSubmit() {
    this._vehicleService.postVehicle(this.vehicle)
        .subscribe(
          res => {
            console.log(res)
            this.successMessage = res.message
            this.errorMessage = null
            setTimeout(() => { this._location.back() }, 1000)
          },
          error => {
            console.log(error)
            if(error.status == 500) {
              var body = error._body;
              if(body) {
                var jsonBody = JSON.parse(body);
                var err = jsonBody.error
                var codeError = err.code;
                if(codeError == 11000)
                  this.errorMessage = 'Ya se encuentra una placa "' + this.vehicle.licensePlate +  '" en el sistema'
                else
                  this.errorMessage = body.message
              }
            }
          })
  }

}

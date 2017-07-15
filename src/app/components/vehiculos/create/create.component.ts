import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../services/vehicles.service';
import { SelectsService } from '../../../services/selects.service';
import { SweetAlertService } from 'ng-sweetalert2-slc';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateVehicleComponent implements OnInit {

  vehicle: any = { type: 'ENVASADO' }
  vehicleTypes: any[];
  dependences: any[] = []
  constructor(
      private _selectService: SelectsService, 
      private _location: Location,
      private _vehicleService: VehicleService,
      private _swal2: SweetAlertService
    ) {
    
   }

  ngOnInit() {
    this.getVehicleTypes();
    this.getDependences();
  }

  getVehicleTypes () {
    this._selectService.getVehicleTypes()
        .subscribe(
          res => this.vehicleTypes = res.data,
          error => console.log(error)
        )
  }
  getDependences () {
    this._selectService.getDependences()
        .subscribe(
          res => {
            if(res.done) {
              this.dependences = res.data;
            }
            
          },
          error => console.log(error)
        )
  }
  onCancel () {
    this._location.back();
  }
  onChange() {

  }
  onSubmit() {
    this._vehicleService.postVehicle(this.vehicle)
        .subscribe(
          res => {
            console.log(res)
            if(res.done) {
              this._swal2.success({ 
                title: 'Registro creado', 
                text: res.message,
                confirmButtonText: 'OK'
              })
              .then(res => this._location.back())
            }
            
          },
          error => {
            console.log(error)
            if(error.status == 500) {
              var body = error._body;
              if(body) {
                var jsonBody = JSON.parse(body);
                var err = jsonBody.error
                var codeError = err.code;
                var msj =  codeError == 11000 ? 'Ya se encuentra una placa "' + this.vehicle.licensePlate +  '" en el sistema' : 'Ha ocurrido un error'
                this._swal2.error({ 
                    title: 'Error', 
                    text: msj,
                    confirmButtonText: 'OK'
                  })
              }
            }
          })
  }
}

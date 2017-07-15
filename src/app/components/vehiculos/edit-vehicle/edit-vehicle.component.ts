import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from '../../../services/vehicles.service';
import { SelectsService } from '../../../services/selects.service';
import { SweetAlertService } from 'ng-sweetalert2-slc';
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
  dependences: any[] = []
  constructor(
    private _route: ActivatedRoute,
    private _vehicleService: VehicleService,
    private _selectService: SelectsService,
    private _location: Location,
    private _swal2: SweetAlertService
  ) { }

  ngOnInit() {
    this.getVehicleTypes();
    this.id = this._route.snapshot.params['id'];
    this.getDependences();
    this.getVehicle(this.id);
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
  getVehicle (id) {
    this._vehicleService.getOneVehicle(id)
        .subscribe(
          res => {
            if(res.done){
              this.vehicle = res.record;
              this.vehicle.dependence = res.record.warehouse.dependence;
              console.log(this.vehicle)
            }
          },
          err => console.log('error' , err));
  }
  onSubmit(){
    console.log('guardando ', this.id)
    this._vehicleService.updateVehicle(this.id, this.vehicle)
        .subscribe(res => {
          if(res.done) {
              this._swal2.success({ 
                title: 'Registro editado', 
                text: res.message,
                confirmButtonText: 'OK'
              })
              .then(
                res => this._location.back(), 
                cancel => this._location.back()
              )
            }
        }, 
          error => {
            console.log(err);
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
                  .then(
                      res => {}, 
                      cancel => {}
                    )
              }
            }
          });
  }

}

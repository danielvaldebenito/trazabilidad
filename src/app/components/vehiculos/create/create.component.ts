import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core'
import { VehicleService } from '../../../services/vehicles.service'
import { SelectsService } from '../../../services/selects.service'
import { UserService } from '../../../services/user.service'
import { SweetAlertService } from 'ngx-sweetalert2'
import { Location } from '@angular/common'
import { IOption } from "ng-select"
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as Enumerable from 'linq'
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [SweetAlertService]
})
export class CreateVehicleComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.updateDependences) {
      this.getDependences();
    }
  }

  vehicle: any = { type: 'ENVASADO' }
  vehicleTypes: any[]
  allDependences: any[]
  selectedDependence: any = {}
  dependences: Array<IOption>
  allUsers: any[] = []
  users: Array<IOption>
  user: any
  @Input() fromTutorial: boolean = false
  @Input() updateDependences: boolean = false
  @Output() submitForm = new EventEmitter();
  constructor(
      private _selectService: SelectsService, 
      private _location: Location,
      private _vehicleService: VehicleService,
      private _swal2: SweetAlertService,
      private _selectsService: SelectsService,
      private _modalService: NgbModal,
      private _userService: UserService
    ) {
    
   }

  ngOnInit() {
    this.getVehicleTypes()
    this.getDependences()
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
              var array = []
              this.allDependences = res.data
              res.data.forEach(element => {
                array.push({ label: element.name, value: element._id })
              });
              this.dependences = array
            }
            
          },
          error => console.log(error)
        )
  }
  onSelectDependence(dep) {
    console.log('dep', dep)
    this.selectedDependence = Enumerable.from(this.allDependences)
                              .where(w => { return w._id == dep.value })
                              .firstOrDefault();
    console.log('selectedDependence', this.selectedDependence)
    
  }
  onDeselectDependence (dep) {
    this.selectedDependence = null
  }
  onCancel () {
    this._location.back()
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
              .then(res => {
                if(this.fromTutorial) {
                  this.submitForm.emit();
                } else {
                  this._location.back()
                }
                
              })
            }
            
          },
          error => {
            console.log(error)
            if(error.status == 500) {
              var body = error._body
              if(body) {
                var jsonBody = JSON.parse(body)
                var err = jsonBody.error
                var codeError = err.code
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
  getUsers () {
    var rol = 'VEHÍCULO'
    this._selectsService.getUserFromRol(rol)
        .subscribe(res => {
          if(res.done) {
            var data = res.data
            this.allUsers = data
            var array = []
            data.forEach(element => {
              array.push({ label: element.name + ' ' + element.surname, value: element._id })
            })
            this.users = array
          }
        }, 
        error => console.log(error))
  }
  open (content) {
    this._modalService.open(content, { size: 'lg' })
        .result.then((result) => {
          //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
  }
  refreshUser (userId) {
    this.getUsers ();
    this.vehicle.user = userId
  }
  refreshDependence (dependenceId) {
    this.getDependences();
    this.vehicle.dependence = dependenceId;
  }

  isAdminFromAnyDependence() {
    const identity = this._userService.getUserIdentity()
    return !identity.dependence && identity.roles.indexOf('ADMIN') > -1
  }
}

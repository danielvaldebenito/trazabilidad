import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { SelectsService } from '../../../services/selects.service';
import { UsersService } from '../../../services/users.service';
import { IOption } from "ng-select";
import { NotificationsService } from 'angular2-notifications';
import { SweetAlertService } from 'ngx-sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GLOBAL } from '../../../global'

function minOne (c: AbstractControl) {
  return c.get('isAdmin').value === true || c.get('isVehicle').value === true || c.get('isOperator').value === true
    ? null : { minOne: true }
}
function vehicleValidator (c: AbstractControl) {
  return c.get('roles').get('isVehicle').value === true && !c.get('vehicle').value ?
    { vehicleValidator: true } : null
}

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css'],
  providers: [SweetAlertService]
})
export class UsersEditComponent implements OnInit {
  form: FormGroup
  vehicles: Array<IOption>
  allProcess: any[]
  userExistsError: boolean = false
  id: string
  user: any
  apiUrl: string = GLOBAL.apiUrl;
  constructor(
    private _fb: FormBuilder,
    private _selectsService: SelectsService,
    private _usersService: UsersService,
    private _notify: NotificationsService,
    private _swal2: SweetAlertService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _location: Location
  ) 
  {
    this.getVehicles();
    
    this.id =  this._route.snapshot.params["id"];
    this.getOne (this.id);
  }
  getOne (id) {
    this._usersService.getUser (id)
        .subscribe(res =>{
          if(res.done) {
            this.user = res.data
            console.log('user', this.user)
            this.initForm(this.user)
            this.getProcesses();
          }
        }, error => {
          console.log(error)
        })
  }
  initProcess (process?) {
    var selected = false;
    var proc = this.user.internalProcessTypes;
    if(proc)
      selected = proc.indexOf(process._id) > -1
    return this._fb.group({
      id: [process._id], 
      name: [process.name],
      selected: [selected]
    });
  }
  initForm (user) {
    this.form = this._fb.group({
      name: [user.name, Validators.required],
      surname: [user.surname, Validators.required],
      username: [user.username, Validators.required],
      email: [user.email, Validators.compose([Validators.email, Validators.required])],
      vehicle: user.vehicle,
      process: new FormArray([

      ]),
      roles: this._fb.group({
        isAdmin: new FormControl(user.isAdmin),
        isVehicle: new FormControl(user.roles.indexOf('VEHÍCULO') > -1),
        isOperator: new FormControl(this.user.internalProcessTypes != null && this.user.internalProcessTypes.length > 0)
      }, { validator: minOne })
    }, { validator: vehicleValidator })
  }
  ngOnInit() {
  }
  getVehicles () {
    this._selectsService.getVehicleToAsign()
        .subscribe(res => {
          console.log(res)
          if(res.done){
            var data = res.data
            var array = []
            data.forEach(element => {
              array.push({ label: element.licensePlate, value: element._id })
            });
            this.vehicles = array;
          }
        }, error => console.log(error))
  }
  onCancel () {
    console.log('oncancel')
    this._location.back();
  }
  filesToUpload: Array<File>
  imageSelected: any;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>> fileInput.target.files;
    var self = this;
    var reader = new FileReader();
    reader.onload = function(e: any) {
        var src = e.target.result;
        self.imageSelected = src;
    };
    reader.readAsDataURL(fileInput.target.files[0]);
  }
  onKeyUsername (event) {
    if(!this.form.get('username').value) {
      this.userExistsError = false;
      return;
    }
    this._usersService.validateUser(this.form.get('username').value, this.user._id)
        .subscribe(res => {
          if(res.done){
            this.userExistsError = res.exists
          }

        }, err => console.log(err))
  }
  addProcess (process: any) {
    const control = <FormArray>this.form.controls['process'];
    control.push(this.initProcess(process));
  }
  getProcesses () {
    this._selectsService.getProcesses ()
        .subscribe(res => {
          if(res.done) {
            var data = res.data;
            this.allProcess = data;
            var array = []
            data.forEach(element => {
              this.addProcess(element)
            });
          }
        }, err => console.log(err))
  }
   onSubmit (){

    this._usersService
        .updateUser(this.form.value, this.id)
        .subscribe(
          res => {
            if(res.done) {
              this.userExistsError = false
              if(this.filesToUpload) {
                this._usersService
                      .makeFileRequest(this.filesToUpload, res.updated._id)
                      .then(res => console.log(res))
                      .catch(error => console.log(error))
              }
              this._swal2.success({
                title: 'Modificación Usuario',
                text: res.message,
                confirmButtonText: 'Aceptar'
              })
              .then(ok => {
                this._router.navigate(['/users'])
              }, nook => {
                this._router.navigate(['/users'])
              })
              
            }
          },
          error => {
            var body = error._body
            var jsonBody = JSON.parse(body);
            var err = jsonBody.err
            if(err.code == 11000) {
              this.userExistsError = true
              this._notify.error('Nombre de usuario ya existe', 'Intente con otro')
            }
          }
        )

  }
}

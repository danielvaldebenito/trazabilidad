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
import { InternalProcessesService } from 'app/services/internal-processes.service';
import { DependencesService } from 'app/services/dependences.service';
import { UserService } from 'app/services/user.service';

function minOne (c: AbstractControl) {
  return c.get('isAdmin').value === true || c.get('isVehicle').value === true || c.get('isOperator').value === true
    ? null : { minOne: true }
}


@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css'],
  providers: [SweetAlertService]
})
export class UsersEditComponent implements OnInit {
  selectedDependence: any;
  dependences: any[];
  internalProcesses: any[];
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
    private _userService: UserService,
    private _usersService: UsersService,
    private _notify: NotificationsService,
    private _swal2: SweetAlertService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _location: Location,
    private _internalProcessesService: InternalProcessesService,
    private _dependencesService: DependencesService
  ) 
  {
    this.getVehicles();
    this.getDependences();
    
    
    this.id =  this._route.snapshot.params["id"];
    
    this.getOne (this.id);
    const self = this
    setTimeout(function() {
      if(self.user.dependence) 
        this.selectedDependence = self.user.dependence
      self.getInternalProcesses(self.user.dependence, self.user.internalProcessTypes)
      self.getProcesses();
    }, 500);
    
  }
  getOne (id) {
    this._usersService.getUser (id)
        .subscribe(res =>{
          if(res.done) {
            this.user = res.data
            console.log('user', this.user)
            this.initForm(this.user)
            if(this.user.dependence)
              this.onSelectDependence({ value: this.user.dependence })
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
      internalProcess: [user.internalProcess],
      dependence: user.dependence,
      roles: this._fb.group({
        isAdmin: new FormControl(user.roles.indexOf('ADMIN') > -1),
        isVehicle: new FormControl(user.roles.indexOf('VEHÍCULO') > -1),
        isOperator: new FormControl(this.user.internalProcessTypes != null && this.user.internalProcessTypes.length > 0)
      }, { validator: minOne })
    })

    
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
  getInternalProcesses(dependence, types) {
    console.log({dependence, types})
    if(!dependence || !types) return;
    this._internalProcessesService.getByDependenceAndType(dependence, types)
      .subscribe(res => {
        if(res.done) {
          var data = res.records;
          var array = []
          data.forEach(element => {
            array.push({ value: element._id, label: element.name })
          });
          this.internalProcesses = array;
          this.form.get('internalProcess').setValue(this.user.internalProcess)
        }
      }, error => console.log(error))
  }
  getDependences() {
    this._selectsService.getDependences()
      .subscribe(res => {
        if(res.done) {
          var data = res.data;
          var array = []
          data.forEach(element => {
            array.push({ label: element.name, value: element._id })
          });
          this.dependences = array
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
  onSelectDependence(dependence) {
    if(dependence == null) return;
    this.selectedDependence = dependence;
    const value = this.form.value
    const process = value.process.filter((f) => { return f.selected })
    console.log('select dependence', process)
    const types = process.map((a) => {return a.id })
    
    this.getInternalProcesses(dependence.value, types)
  }
  onDeselectDependence (algo) {
    this.selectedDependence = null;
    this.internalProcesses = [];
  }

  isIntern() {
    return this._userService.getUserIdentity().distributor.intern;
  }
}

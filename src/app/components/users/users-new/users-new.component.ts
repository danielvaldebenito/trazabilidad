import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { SelectsService } from '../../../services/selects.service';
import { UserService } from '../../../services/user.service';
import { UsersService } from '../../../services/users.service';
import { InternalProcessesService } from '../../../services/internal-processes.service'
import { DependencesService } from '../../../services/dependences.service'
import { IOption } from "ng-select";
import { NotificationsService } from 'angular2-notifications';
import { SweetAlertService } from 'ngx-sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
function minOne (c: AbstractControl) {
  return c.get('isAdmin').value === true || c.get('isVehicle').value === true || c.get('isOperator').value === true
    ? null : { minOne: true }
}
function vehicleValidator (c: AbstractControl) {
  return c.get('roles').get('isVehicle').value === true && !c.get('vehicle').value && c.get('fvm').value === false
    ? 
    { vehicleValidator: true } : null
}

@Component({
  selector: 'app-users-new',
  templateUrl: './users-new.component.html',
  styleUrls: ['./users-new.component.css'],
  providers: [SweetAlertService]
})
export class UsersNewComponent implements OnInit {

  form: FormGroup
  vehicles: Array<IOption>;
  dependences: Array<IOption>
  selectedDependence: any;
  allProcess: any[];
  internalProcesses: any[];
  userExistsError: boolean = false
  @Input() fromModal: boolean = false
  @Input() fromVehiclesModule: boolean = false
  @Output() onSubmitForm = new EventEmitter ()
  get proccesses () { return this.form.get('process') as FormArray; }
  constructor(
    private _fb: FormBuilder,
    private _selectsService: SelectsService,
    private _userService: UserService,
    private _usersService: UsersService,
    private _notify: NotificationsService,
    private _swal2: SweetAlertService,
    private _router: Router,
    private _location: Location,
    private _internalProcessesService: InternalProcessesService,
    private _dependencesService: DependencesService
  ) {
    
    
  }
  initForm() {
    this.form = this._fb.group({
      name: [null, Validators.required],
      surname: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, Validators.compose([Validators.email, Validators.required])],
      vehicle: null,
      process: new FormArray([

      ]),
      internalProcess: [null],
      dependence: [null],
      fvm: this.fromVehiclesModule,
      roles: this._fb.group({
        isAdmin: [!this.fromVehiclesModule],
        isVehicle: [this.fromVehiclesModule],
        isOperator: [false]
      }, { validator: minOne })
    }, { validator: vehicleValidator })
  }
  initProcess (process?) {
    return this._fb.group({
      id: [process._id], 
      name: [process.name],
      selected: [false]
    });
  }
  onSelectVehicle (vehicle) {

  }
  onDeselectVehicle (vehicle) {
    
  }
  addProcess (process: any) {
    const control = <FormArray>this.form.controls['process'];
    control.push(this.initProcess(process));
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
  getProcesses () {
    this._selectsService.getProcesses ()
        .subscribe(res => {
          if(res.done) {
            var data = res.data;
            
            var array = []
            data.forEach(element => {
              this.addProcess(element)
            });
            this.allProcess = data;
          }
        }, err => console.log(err))
  }
  getInternalProcesses(dependence, types) {
    this._internalProcessesService.getByDependenceAndType(dependence, types)
      .subscribe(res => {
        if(res.done) {
          var data = res.records;
          var array = []
          data.forEach(element => {
            array.push({ value: element._id, label: element.name })
          });
          this.internalProcesses = array;
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
  ngOnInit() {
    this.getVehicles();
    this.getProcesses();
    this.getDependences();
    this.initForm();
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

  onSubmit (){
    this._usersService
        .saveUser(this.form.value)
        .subscribe(
          res => {
            if(res.done) {
              this.userExistsError = false
              if(this.filesToUpload) {
                this._usersService
                      .makeFileRequest(this.filesToUpload, res.stored._id)
                      .then(res => console.log(res))
                      .catch(error => console.log(error))
              }
              this._swal2.success({
                title: 'Nuevo Usuario',
                text: res.message,
                confirmButtonText: 'Listo',
                cancelButtonText: 'Nuevo',
                showCancelButton: true
              })
              .then(ok => {
                if(this.fromModal)
                  this.onSubmitForm.emit(res.stored._id);
                else
                  this._router.navigate(['/users'])
              }, nook => {
                this.form.reset()
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
  onCancel () {
    this._location.back();
  }
  onKeyUsername (event) {
    if(!this.form.get('username').value) {
      this.userExistsError = false;
      return;
    }
    this._usersService.validateUser(this.form.get('username').value)
        .subscribe(res => {
          if(res.done){
            this.userExistsError = res.exists
          }

        }, err => console.log(err))
  }
  isIntern() {
    return this._userService.getUserIdentity().distributor.intern;
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

  
}

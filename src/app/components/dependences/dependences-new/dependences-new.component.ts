import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { DependencesService } from '../../../services/dependences.service'
import { UserService } from '../../../services/user.service'
import { Location } from '@angular/common'
import { SweetAlertService } from 'ngx-sweetalert2'
@Component({
  selector: 'app-dependences-new',
  templateUrl: './dependences-new.component.html',
  styleUrls: ['./dependences-new.component.css'],
  providers: [SweetAlertService]
})
export class DependencesNewComponent implements OnInit {
  form: FormGroup
  @Input() fromModal: boolean = false
  @Input() fromTutorial:boolean = false
  @Input() fromVehiclesModule: boolean = false
  @Output() submitForm = new EventEmitter <string>()
  constructor(
    private _fb: FormBuilder,
    private _dependencesService: DependencesService,
    private _userService: UserService,
    private _swal2: SweetAlertService,
    private _location: Location
  ) { }

  ngOnInit() {
    this.initForm ()
  }
  initForm () {
    this.form = this._fb.group({
      name: [null, Validators.required],
      address: [null],
      email: [null, Validators.email],
      phone: [null, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)],
      isPlant: [false]
    })
  }
  onCancel () {
    this._location.back()
  }
  iHavePlants() {
    return this._userService.getUserIdentity ().distributor.intern
  }
  onSubmit() {
    this._dependencesService.postDependence(this.form.value)
        .subscribe(res => {
          console.log(res)
          if(res.done) {
            this._swal2.success({
              title: 'Dependencia creada',
              text: res.message,
              showCancelButton: !this.fromModal && !this.fromTutorial,
              cancelButtonText: 'NUEVA',
              confirmButtonText: 'LISTO'
            })
            .then(ok => {
              if(this.fromModal || this.fromTutorial)
                this.submitForm.emit(res.stored._id)
              else
                this.onCancel()
            }, nook => {
              if(this.fromModal || this.fromTutorial) {
                this.submitForm.emit(res.stored._id)
              } else {
                this.form.reset()
              }
            })
          } else {
            this._swal2.error({
              title: 'Dependencia no creada',
              text: 'Ha ocurrido un error',
              confirmButtonText: 'REINTENTAR'
            })
            .then(res => {
              this.form.reset()
            }, no => {
              this.onCancel()
            })
            
          }
        }, error => console.log(error))
  }

}

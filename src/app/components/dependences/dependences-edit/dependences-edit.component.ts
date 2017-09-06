import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { DependencesService } from '../../../services/dependences.service'
import { UserService } from '../../../services/user.service'
import { Location } from '@angular/common'
import { SweetAlertService } from 'ngx-sweetalert2';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-dependences-edit',
  templateUrl: './dependences-edit.component.html',
  styleUrls: ['./dependences-edit.component.css'],
  providers: [SweetAlertService]
})
export class DependencesEditComponent implements OnInit {
  form: FormGroup
  id: string
  constructor(
    private _fb: FormBuilder,
    private _dependencesService: DependencesService,
    private _userService: UserService,
    private _swal2: SweetAlertService,
    private _location: Location,
    private _activatedRoute: ActivatedRoute
  ) {

    this.id = this._activatedRoute.snapshot.params['id']
    this.getOne(this.id);
   }

  ngOnInit() {
    
  }
  getOne (id) {
    this._dependencesService.getOneDependence(id)
        .subscribe(res => {
          console.log(res)
          this.initForm (res.dependence)
        }, error => {console.log(error); this.onCancel()})
  }
  initForm (dependence) {
    this.form = this._fb.group({
      name: [dependence.name, Validators.required],
      address: [dependence.address],
      email: [dependence.email, Validators.email],
      phone: [dependence.phone, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)],
      isPlant: [dependence.isPlant]
    })
  }
  onCancel () {
    this._location.back()
  }
  iHavePlants() {
    return this._userService.getUserIdentity ().distributor.intern
  }
  onSubmit() {
    this._dependencesService.updateDependence(this.id, this.form.value)
        .subscribe(res => {
          console.log(res)
          if(res.done) {
            this._swal2.success({
              title: 'Dependencia actualizada',
              text: res.message,
              confirmButtonText: 'LISTO'
            })
            .then(ok => {
              this.onCancel()
            }, nook => {
              this.onCancel()
            })
          }
        }, error => console.log(error))
  }

}

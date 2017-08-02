import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { FoliosService } from '../../../services/folios.service'
import { SweetAlertService } from 'ng-sweetalert2-slc';
import { Location } from '@angular/common'

function startMinorEnd (c: AbstractControl) {
  return c.get('start').value <= c.get('end').value ? null : { startMinorEnd: true }
}

@Component({
  selector: 'app-folios-new',
  templateUrl: './folios-new.component.html',
  styleUrls: ['./folios-new.component.css']
})
export class FoliosNewComponent implements OnInit {
  form: FormGroup
  loading: boolean = false
  constructor(
    private _fb: FormBuilder,
    private _foliosService: FoliosService,
    private _swal2: SweetAlertService,
    private _location: Location
  ) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.form = this._fb.group({
      start: [null, Validators.required],
      end: [null, Validators.required]
    }, { validator: startMinorEnd })
  }

  onSubmit() {
    this.loading = true
    this._foliosService.postFolio(this.form.value)
        .subscribe(res => {
          this.loading = false
          if(res.done) {
            
            this._swal2.success({
              title: 'Guardado',
              text: res.message
            })
            .then(
              yes => this.onCancel(),
              no => this.onCancel()
             )
          } else {
            this._swal2.warning({
              title: 'Atención',
              text: res.message
            })
          }
        }, error => {
          this.loading = false
          console.log(error)
          this._swal2.error({
            title: 'Error',
            text: 'Ha ocurrido un error, intenta más tarde'
          })
        })
  }
  onCancel () {
    this._location.back()
  }
}

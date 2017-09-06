import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service'
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { SweetAlertService } from 'ngx-sweetalert2'
function passwordMatcher (c: AbstractControl) {
    return c.get('newPassword').value === c.get('confirm').value
      ? null : { 'nomatch': true }
}
@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.css'],
  providers: [SweetAlertService]
})
export class NewPassComponent implements OnInit {
  @Output() resetPass = new EventEmitter ();
  @Input() fromModal: boolean = false;
  @Input() userName: string;
  form: FormGroup
  constructor(
    private _userService: UserService,
    private _fb: FormBuilder,
    private _swal2: SweetAlertService
    
  ) {
    
   }

  ngOnInit() {
    this.form = this._fb.group({
      username: [{value: this.userName ? this.userName : null, disabled: this.userName }, Validators.required],
      temporalPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirm: [null, Validators.required]
    }, { validator: passwordMatcher})

    
  }

  onSubmit() {
    var json = this.form.value;
    console.log(json)
    json.fromModal = this.fromModal
    if(this.fromModal)
      json.username = this.userName
    this._userService.resetPass(json)
        .subscribe(res => {
          if (res.done) {
            this._swal2.success({
              title: 'OK',
              text: res.message
            })
            .then(res => this.resetPass.emit ())
          } else {
            this._swal2.error({
              title: 'Error',
              text: res.message
            })
          }

        }, error => {
          console.log(error)
          this._swal2.error({
              title: 'Error',
              text: 'Ha ocurrido un error'
            })
        })
  }
}

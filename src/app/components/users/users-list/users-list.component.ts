import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GLOBAL } from '../../../global'
import { UserService } from '../../../services/user.service'
import { UsersService } from '../../../services/users.service'
import { SweetAlertService } from 'ngx-sweetalert2'
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @Input() users: any[]
  @Input() pager: any = {}
  @Output() toRefresh = new EventEmitter();
  apiUrl: string = GLOBAL.apiUrl;
  iAmAdmin: any
  constructor(
    private _userService: UserService,
    private _usersService: UsersService,
    private _swal2: SweetAlertService
  ) { 
    this.iAmAdmin = this._userService.getUserIdentity().isAdmin;
  }

  ngOnInit() {
  }

  iAm (user) {
    return this._userService.getUserIdentity().username == user.username
  }
  tryDisable(user) {
    this._swal2.confirm({
      title: 'Deshabilitar usuario',
      text: '¿Está seguro que desea deshabilitar a este usuario?',
      confirmButtonText: 'Sí, seguro',
      cancelButtonText: 'Cancelar'
    })
    .then(res => this.disable(user))
    .catch(error => console.log(error))

  }

  disable(user) {
    this._usersService.disableUser(user._id)
      .subscribe(res => {
        if(res.done) {
          this.toRefresh.emit();
          this._swal2.success({
            title: 'Deshabilitado',
            text: res.message
          })
        } else {
          this._swal2.error({
            title: 'Error',
            text: res.message
          })
        }
      }, err => this._swal2.error({
        title: 'Error',
        text: 'Ha ocurrido un error'
      }))
  }

  tryEnable(user) {
    this._swal2.confirm({
      title: 'Habilitar usuario',
      text: '¿Está seguro que desea habilitar a este usuario?',
      confirmButtonText: 'Sí, seguro',
      cancelButtonText: 'Cancelar'
    })
    .then(res => this.enable(user))
    .catch(error => console.log(error))

  }

  enable(user) {
    this._usersService.enableUser(user._id)
      .subscribe(res => {
        if(res.done) {
          this.toRefresh.emit();
          this._swal2.success({
            title: 'Habilitado',
            text: res.message
          })
        } else {
          this._swal2.error({
            title: 'Error',
            text: res.message
          })
        }
      }, err => console.log(err))
  }

}

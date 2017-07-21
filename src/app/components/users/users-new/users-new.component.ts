import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SelectsService } from '../../../services/selects.service';
import { UsersService } from '../../../services/users.service';
import { IOption } from "ng-select";
@Component({
  selector: 'app-users-new',
  templateUrl: './users-new.component.html',
  styleUrls: ['./users-new.component.css']
})
export class UsersNewComponent implements OnInit {
  form: FormGroup
  get roles() { return this.form.get('roles') as FormArray; }
  allRoles: any[]
  constructor(
    private _fb: FormBuilder,
    private _selectsService: SelectsService,
    private _usersService: UsersService
  ) {
    this.form = this._fb.group({
      name: [null, Validators.required],
      surname: [null, Validators.required],
      username: [null, Validators.required],
      vehicle: '',
      roles: this._fb.array([

      ]) 
    })
    
  }
  getcontrol(control) {
    console.log(control)
  }
  addRol (rol) {
    this.roles.push(this._fb.group({
      rol: rol,
      selected: false
    }));
  }
  getRoles () {
    this._selectsService.getRoles ()
      .subscribe(
        res => {
          if(res.done) {
            var data = res.data;
            this.allRoles = data;
            data.forEach(rol => {
              this.addRol (rol);            
            });
            
          }
        },
        err => console.log(err)
      )
  }
  onSelectRol (rol) {
    console.log('select rol', rol)
  }
  onDeselectRol (rol) {
    console.log('deselect rol', rol)
  }
  ngOnInit() {
    this.getRoles ();
  }

}

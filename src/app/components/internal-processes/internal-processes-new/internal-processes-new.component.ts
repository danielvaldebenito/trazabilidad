import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DependencesService } from '../../../services/dependences.service';
import { SelectsService } from '../../../services/selects.service';
import { InternalProcessesService } from '../../../services/internal-processes.service';
import { SweetAlertService } from 'ngx-sweetalert2'
import { IOption } from 'ng-select';
@Component({
  selector: 'app-internal-processes-new',
  templateUrl: './internal-processes-new.component.html',
  styleUrls: ['./internal-processes-new.component.css']
})
export class InternalProcessesNewComponent implements OnInit {

  form: FormGroup;
  types: Array<IOption>;
  dependences: Array<IOption>;
  constructor(
    private _fb: FormBuilder,
    private _dependencesService: DependencesService,
    private _selectsService: SelectsService,
    private _internalProcessesService: InternalProcessesService,
    private _swal2: SweetAlertService,
    private _location: Location
  ) {
    this.getDependences();
    this.getTypes();
    this.initForm();
   }

  getTypes() {
    this._selectsService.getProcesses()
      .subscribe(
        res => {
          console.log(res)
          if(res.done){
            var data = res.data;
            var array = [];
            data.forEach(element => {
              array.push({ label: element.name, value: element._id })
            });
            this.types = array;
          }
        },
        error => {
          console.log(error)
        }
      )
  }
  getDependences() {
    this._selectsService.getDependences()
        .subscribe(
          res => {
            console.log(res)
            if(res.done){
              var data = res.data;
              var array = [];
              data.forEach(element => {
                array.push({ label: element.name, value: element._id })
              });
              this.dependences = array;
            }
          }, 
          error => console.log(error)
        )
  }
  initForm() {
    this.form = this._fb.group({
      type: [null, Validators.required],
      name: [null, Validators.required],
      dependence: [null, Validators.required]
    })
  }
  ngOnInit() {
  }
  onSubmit() {
    this._internalProcessesService.post(this.form.value)
      .subscribe(res => {
        if(res.done) {
          this._swal2.success({
            title: 'Ingresado',
            text: res.message,
            showCancelButton: true,
            cancelButtonText: 'NUEVO'
          }).then(res => {
            this.onCancel()
          }, error => {
            this.form.reset()
          })
        } else {
          this._swal2.error({
            title: 'ERROR',
            text: res.message
          })
        }

      }, error => {
        this._swal2.error({
          title: 'ERROR',
          text: 'Ha ocurrido un error, inténtelo más tarde'
        })
      })
  }

  onCancel() {
    this._location.back();
  }
}

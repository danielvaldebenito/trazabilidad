import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IOption } from 'ng-select';
import { DependencesService } from 'app/services/dependences.service';
import { SelectsService } from 'app/services/selects.service';
import { InternalProcessesService } from 'app/services/internal-processes.service';
import { SweetAlertService } from 'ngx-sweetalert2';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-internal-processes-edit',
  templateUrl: './internal-processes-edit.component.html',
  styleUrls: ['./internal-processes-edit.component.css']
})
export class InternalProcessesEditComponent implements OnInit {

  id: string;
  form: FormGroup;
  types: Array<IOption>;
  dependences: Array<IOption>;
  constructor(
    private _fb: FormBuilder,
    private _dependencesService: DependencesService,
    private _selectsService: SelectsService,
    private _internalProcessesService: InternalProcessesService,
    private _swal2: SweetAlertService,
    private _location: Location,
    private _route: ActivatedRoute
  ) {
    this.id = this._route.snapshot.params['id']
    this.getDependences();
    this.getTypes();
    this.getOne();
   }

  getOne () {
    this._internalProcessesService.getOne(this.id)
      .subscribe(res => {
        console.log(res)
        if(res.done) {
          const record = res.record;
          this.initForm(record)
        }
      })
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
  initForm(record) {
    this.form = this._fb.group({
      type: [record.internalProcessType, Validators.required],
      name: [record.name, Validators.required],
      dependence: [record.warehouse.dependence, Validators.required]
    })
  }
  ngOnInit() {
  }
  onSubmit() {
    this._internalProcessesService.update(this.id, this.form.value)
      .subscribe(res => {
        if(res.done) {
          this._swal2.success({
            title: 'Modificado',
            text: res.message
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

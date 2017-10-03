import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GLOBAL } from '../../../global';
@Component({
  selector: 'app-distributors-new',
  templateUrl: './distributors-new.component.html',
  styleUrls: ['./distributors-new.component.css']
})
export class DistributorsNewComponent implements OnInit {

  form: FormGroup
  regionName = GLOBAL.regionName
  cityName = GLOBAL.cityName
  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this._fb.group({
      nit: [ null, Validators.required ],
      name: [ null, Validators.required ],
      contact: [ null, Validators.required ],
      phone: [ null, Validators.required ],
      email: [ null, Validators.email ],
      address: [null, Validators.required ],
      city: [null, Validators.required],
      region: [null, Validators.required]
    })
  }

}

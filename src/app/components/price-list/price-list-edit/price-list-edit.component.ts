import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SweetAlertService } from 'ng-sweetalert2-slc';
import { Location } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { PriceListService } from '../../../services/price-list.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-price-list-edit',
  templateUrl: './price-list-edit.component.html',
  styleUrls: ['./price-list-edit.component.css']
})
export class PriceListEditComponent implements OnInit {

  plForm: FormGroup
  productTypes : any[] = []
  id: string
  get items() { return this.plForm.get('items') as FormArray; }
  constructor(
    private fb: FormBuilder, 
    private _os: OrderService,
    private _plService: PriceListService,
    private _swal2: SweetAlertService,
    private _location: Location,
    private _route: ActivatedRoute
  ) {
    
    this.plForm = this.fb.group({
      name: [null, Validators.required],
      items: this.fb.array([
      ])
    })

    this.id = this._route.snapshot.params["id"];
    this.getOne (this.id);
  }
  getOne (id) {
    this._plService.getOnePriceList(id)
      .subscribe(res => {
        console.log(res);
        if(res.done) {
          var record = res.record;
          var items = record.items;
          this.plForm.get('name').setValue(record.name);
          items.forEach(i => {
            this.addProduct(i)
          });
        }
      } , e => console.log(e))
  }
  addProduct(pt: any) {
    this.items.push(this.fb.group({
      itemId: pt._id,
      productType: pt.productType._id,
      pt: [{value: pt.productType.name, disabled: true}, Validators.required],
      price: [pt.price, Validators.required]
    }));
  }

  ngOnInit() {
  }

  onSubmit() {
    var json = this.plForm.value;
    json.items = JSON.stringify(json.items)
    console.log('tosave', json)
    this._plService.updatePriceList(this.id, json)
        .subscribe(
          res => {
            if(res.done) {
              this._swal2.success({
                title: 'OK',
                text: res.message
              })
              .then(
                response => {
                  this._location.back()
                }
              )
            } else
              console.log(res.message)
          },
          err => console.log(err)
        )
  }

}

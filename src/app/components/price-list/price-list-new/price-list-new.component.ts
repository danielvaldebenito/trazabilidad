import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SweetAlertService } from 'ng-sweetalert2-slc';
import { Location } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { PriceListService } from '../../../services/price-list.service';
@Component({
  selector: 'app-price-list-new',
  templateUrl: './price-list-new.component.html',
  styleUrls: ['./price-list-new.component.css']
})
export class PriceListNewComponent implements OnInit {
  @Input() fromModal: boolean = false;
  @Output() onSubmitForm = new EventEmitter<string>()
  plForm: FormGroup
  productTypes : any[] = []
  get items() { return this.plForm.get('items') as FormArray; }
  constructor(
    private fb: FormBuilder, 
    private _os: OrderService,
    private _plService: PriceListService,
    private _swal2: SweetAlertService,
    private _location: Location
  ) {
    
    this.plForm = this.fb.group({
      name: [null, Validators.required],
      items: this.fb.array([
      ])
    })
    this.getProductTypes();
    
  }
  addProduct(pt: any) {
    this.items.push(this.fb.group({
      productType: pt._id,
      pt: [{value: pt.name, disabled: true}, Validators.required],
      price: [0, Validators.required]
    }));
  }
  getProductTypes () {
    this._os.getProductTypes()
        .subscribe(
          res => {
            if(res.done)
              this.productTypes = res.data
              this.productTypes.forEach(f => { this.addProduct(f) })
              
          },
          error => {
            console.log(error)
          }
        )
  }
  ngOnInit() {
  }

  onSubmit() {
    var json = this.plForm.value;
    json.items = JSON.stringify(json.items)
    this._plService.postPriceList(json)
        .subscribe(
          res => {
            if(res.done) {
              this._swal2.success({
                title: 'OK',
                text: res.message
              })
              .then(
                response => {
                  if(!this.fromModal)
                    this._location.back()
                  console.log('enviando stored', res.stored)
                  this.onSubmitForm.emit(res.stored);
                }
              )
            } else
              console.log(res.message)
          },
          err => console.log(err)
        )
  }
  onCancel() {
    this._location.back()
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductsService } from 'app/services/products.service';
import { SweetAlertService } from 'ngx-sweetalert2'
@Component({
  selector: 'app-product-query',
  templateUrl: './product-query.component.html',
  styleUrls: ['./product-query.component.css']
})
export class ProductQueryComponent implements OnInit {

  query: any
  form: FormGroup;
  loading: boolean = false
  @Output() found = new EventEmitter<any>()
  constructor(
    private _fb: FormBuilder,
    private _productsService: ProductsService,
    private swal2: SweetAlertService
  ) {
    this.form = this._fb.group({
      query: [null]
    })

  }

  ngOnInit() {
  }
  onSubmit() {
    if(!this.form.value.query) return;
    this.loading = true
    this._productsService.get(this.form.value.query)
      .subscribe(res => {
        console.log(res)
        if(res.done) {
          this.found.emit(res.data)
        }
        this.loading = false
      }, err => {
        const body = JSON.parse(err._body)
        this.found.emit(null)
        this.swal2.error({
          title: 'No encontrado',
          text: body.message
        })
        this.loading = false
      })
  }
}

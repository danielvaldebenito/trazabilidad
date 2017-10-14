import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { SweetAlertService } from 'ngx-sweetalert2';
import { OrderService } from '../../../services/order.service'
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  @Input() selectedState: any
  @Input() allItems: any = []
  @Input() sidx: string
  @Input() sord: number
  @Output() sorted = new EventEmitter<string>()
  @Output() oncancel = new EventEmitter<string>()
  @Output() refresh = new EventEmitter()
  orderSelected: any;
  zoom: number = 14;
  minZoom: number = 8;
  constructor(
    private _modalService: NgbModal,
    private _swal2: SweetAlertService,
    private _orderService: OrderService
  ) { }

  ngOnInit() {
  }
  
  setSidxSord(sidx: string) {
    this.sorted.emit(sidx)
  }

  open(content, order, size) {
    this.orderSelected = order;
    console.log('order selected', this.orderSelected)
    this._modalService.open(content, { size: size || 'sm' })
        .result.then((result) => {
          //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
  }
  cancel(id) {
    this._swal2.confirm({
      title: 'Cancelar pedido',
      text: '¿Está seguro que desea cancelar este pedido?',
      cancelButtonText: 'No',
      confirmButtonText: 'Sí'
    })
    .then(res => {
      this._orderService.cancelOrder(id)
          .subscribe(
            res => {
              if(res.done) {
                this.oncancel.emit(id)
              }
            }, 
            err => console.log(err)
          )
    })
    .catch(error => console.log(error))
  }
  onSelectedVehicle(vehicle, old) {
    if(!vehicle || !this.orderSelected)
      return;
    this._orderService.assignDeviceToOrder(this.orderSelected._id, vehicle.user.device._id, old)
      .subscribe(
        res => {
          console.log(res)
          if(res.done) {
            
            this.refresh.emit()
          }
        }, 
        error => console.log(error)
      )
  }
}

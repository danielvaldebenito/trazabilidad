import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  @Input() selectedState: any
  @Input() allItems: any
  @Input() sidx: string
  @Input() sord: number
  @Output() sorted = new EventEmitter<string>()
  orderSelected: any;
  zoom: number = 14;
  minZoom: number = 8;
  constructor(
    private _modalService: NgbModal
  ) { }

  ngOnInit() {
  }
  
  setSidxSord(sidx: string) {
    this.sorted.emit(sidx)
  }

  open(content, order, size) {
    this.orderSelected = order;
    console.log('order selected', this.orderSelected)
    this._modalService.open(content, { size: size })
        .result.then((result) => {
          //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
  }
}

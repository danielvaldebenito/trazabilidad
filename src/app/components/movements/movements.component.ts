import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MovementsService } from '../../services/movements.service'
import { SelectsService } from '../../services/selects.service'
import { PagerService } from '../../services/pager.service'
import { NgbModal, ModalDismissReasons, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {
  @ViewChild('details') detailModal: ElementRef;
  fromDate: any;
  toDate: any;
  limit = 50
  page = 1
  pager: any = {}
  type = 'VENTA'
  types: any[]
  movements: any[]
  from: any
  to: any
  selectedMovement: any
  selectedTransaction: any
  selectedType: any
  data: any
  constructor(
    private _movementsService: MovementsService,
    private _selectService: SelectsService,
    private _pagerService: PagerService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getTransactionTypes();
  }
  refresh() {

    this.getMovements(); 
  }
  getTransactionTypes() {
    this._selectService.getTransactionTypes()
      .subscribe(res => {
        if (res.done) {
          this.types = res.data
        }
      })
  }
  getMovements() {

    const from = this.from ? this.from.year + '-' + this.from.month + '-' + this.from.day : null
    const to = this.to ? this.to.year + '-' + this.to.month + '-' + this.to.day : null
    this._movementsService.get(this.type, this.limit, this.page, from, to)
      .subscribe(res => {
        if (res.done) {
          this.movements = res.records;
          this.pager = this._pagerService.getPager(res.total, this.page, this.limit);
          this.selectedMovement = null
          this.selectedTransaction = null
        }
      })
  }
  setPage(page: number) {
    this.page = page
    this.refresh()
  }
  selectType(type: string) {
    this.page = 1
    this.type = type;
    this.refresh();
  }

  changeDate (date: any) {
    this.from = date.from
    this.to = date.to
    this.refresh();
  }
  
  onSelectTransactionOrMovement(data) {
    console.log('onSelectTransactionOrMovement',data)
    this.selectedMovement = data.selectedMovement
    this.selectedTransaction = data.selectedTransaction
    
  }
  


}

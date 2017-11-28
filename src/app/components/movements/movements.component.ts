import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MovementsService } from '../../services/movements.service'
import { SelectsService } from '../../services/selects.service'
import { PagerService } from '../../services/pager.service'
import { NgbModal, ModalDismissReasons, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment'
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
  loading: boolean
  loadingExcel: boolean
  typesForExcel = ['CARGA', 'DESCARGA']
  filter: any
  selectedRange: any = { from: moment().add(-2, 'months').format("YYYY-MM-DD"), to: moment().format("YYYY-MM-DD") }
  constructor(
    private _movementsService: MovementsService,
    private _selectService: SelectsService,
    private _pagerService: PagerService,
    private _modalService: NgbModal
  ) {
    this.loading = false
   }

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
    this.loading = true
    const from = this.selectedRange && this.selectedRange.from ? this.selectedRange.from : null
    const to = this.selectedRange && this.selectedRange.to ? this.selectedRange.to : null
    this._movementsService.get(this.type, this.limit, this.page, from, to, this.filter)
      .subscribe(res => {
        if (res.done) {
          this.movements = res.records;
          this.pager = this._pagerService.getPager(res.total, this.page, this.limit);
          this.selectedMovement = null
          this.selectedTransaction = null
        }
        this.loading = false
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

  onChangeDates (date: any) {
    this.from = date.from
    this.to = date.to
    
  }
  
  onSelectTransactionOrMovement(data) {
    console.log('onSelectTransactionOrMovement',data)
    this.selectedMovement = data.selectedMovement
    this.selectedTransaction = data.selectedTransaction
    
  }
  
  exportTransactions() {
    this.loadingExcel = true
    const from = this.selectedRange.from
    const to = this.selectedRange.to
    this._movementsService.exportTransactionToExcel(this.type, from, to)
        .subscribe(res => {
          this.loadingExcel = false
        }, error => {
          this.loadingExcel = false
        })
  }

  onKey() {
    this.getMovements();
  }

  open(content, size) {
    this._modalService.open(content, { size: size || 'sm' })
      .result
      .then(res => {
        if (res == 'OK') {
          let from = this.from
          if (from)
            from.month = this.from.month - 1;
          let to = this.to
          if (to)
            to.month = this.to.month - 1;
          this.selectedRange = {
            from: from ? moment(this.from).format("YYYY-MM-DD") : null,
            to: to ? moment(this.to).format("YYYY-MM-DD") : null
          }

          this.refresh();
        }
      }, rej => {
        console.log(rej)
      })
  }
}

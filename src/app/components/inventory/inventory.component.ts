import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service'
import { PagerService } from '../../services/pager.service'
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment'
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  filter: string
  inventories: any[]
  limit: number = 20
  limitExcel: number = 20000
  currentPage: number = 1
  pager: any
  from: any = moment().add(-2, 'months')
  to: any = moment()
  selectedRange: any = { from: moment(this.from).format("YYYY-MM-DD") , to: moment(this.to).format("YYYY-MM-DD") }
  constructor(
    private _inventoriesService: InventoryService,
    private _pagerService: PagerService,
    private _modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getInventories()
  }

  getInventories () {
    this._inventoriesService.get(this.selectedRange.from, this.selectedRange.to, this.filter, this.limit, this.currentPage)
      .subscribe(res => {
        if(res.done) {
          this.inventories = res.data.records
          this.pager = this._pagerService.getPager(res.data.total, this.currentPage, this.limit)
        }
      }, error => {
        console.log('error', error)
      })
  }
  exportar() {
    this._inventoriesService.export(this.selectedRange.from, this.selectedRange.to, this.filter, this.limitExcel, this.currentPage)
    .subscribe(res => {
      console.log(res)
    }, error => {
      console.log('error', error)
    })
  }
  refresh() {
    this.getInventories();
  }
  onKey () {
    this.refresh();
  }
  setPage(page) {
    this.currentPage = page;
    this.refresh();
  }
  onChangeDates(dates) {
    this.from = dates.from
    this.to = dates.to
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

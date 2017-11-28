import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { UserService } from '../../../services/user.service';
import { SelectsService } from '../../../services/selects.service'
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment'
@Component({
  selector: 'app-order-monitor',
  templateUrl: './order-monitor.component.html',
  styleUrls: ['./order-monitor.component.css']
})
export class OrderMonitorComponent implements OnInit {
  pager: any = {}
  from: any
  to: any
  selectedRange: any
  type: string = 'vehicle'
  data: any[]
  loading: boolean
  myDistributor: any
  distributor: any
  distributorName: string = 'DISTRIBUIDORES'
  filter: string
  page = 1
  limit = 10
  loadingExcel:boolean
  constructor(
    private _orderService: OrderService,
    private _userService: UserService,
    private _selectsService: SelectsService,
    private _modalService: NgbModal
  ) { }

  ngOnInit() {
    const date1 = moment().add(-2, 'month').format("YYYY-MM-DD")
    const date2 = moment().format("YYYY-MM-DD")
    this.selectedRange = {
      from: date1,
      to: date2
    }
    
    this.myDistributor = this.getMyDistributor();
    this.distributorName = this.myDistributor.intern ? 'DISTRIBUIDORES' : this.myDistributor.name
    this.distributor = this.myDistributor.intern ? undefined : this.myDistributor._id
    this.getData();
  }
  getData() {
    this.loading = true
    this._orderService.getMonitorData(this.distributor, this.type, this.selectedRange.from, this.selectedRange.to, this.filter, this.page, this.limit)
      .subscribe(res => {
        console.log(res)
        if (res.done) {
          this.data = res.data
          this.loading = false
        }
      }, error => {
        console.log(error)
      })
  }
  export() {
    this.loadingExcel = true
    this._orderService.exportMonitorData(this.distributor, this.type, this.selectedRange.from, this.selectedRange.to, this.filter)
      .subscribe(res => { this.loadingExcel = false, console.log(res)}, error => console.log(error))
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

          console.log('selectedRange before', this.selectedRange)
          this.selectedRange = {
            from: from ? moment(this.from).format("YYYY-MM-DD") : null,
            to: to ? moment(this.to).format("YYYY-MM-DD") : null
          }
          console.log('consultando', this.selectedRange)
          this.getData();
        }
      }, rej => {
        console.log(rej)
      })
  }

  onChangeDates(dates) {
    this.from = dates.from
    this.to = dates.to
  }
  changeType(type: string) {
    this.type = type;
    this.getData();
  }
  onSelectDistributor(distributor: any) {
    this.distributor = distributor._id
    this.distributorName = distributor.name
    this.getData();
  }
  onKey() {
    this.getData();
  }
  refresh() {
    this.getData();
  }
  iAmSuperAdmin() {
    const identity = this._userService.getUserIdentity();
    return identity.isAdmin && identity.distributor.intern;
  }
  getMyDistributor() {
    const identity = this._userService.getUserIdentity();
    return identity.distributor;
  }
}

import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MovementsService } from '../../../services/movements.service'
import { OrderService } from '../../../services/order.service'
import * as Enumerable from 'linq'
@Component({
  selector: 'app-movements-list',
  templateUrl: './movements-list.component.html',
  styleUrls: ['./movements-list.component.css']
})
export class MovementsListComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.selectedMovement) {
      if(changes.selectedMovement.currentValue) {
        this.filteringProductType('all')
      }
    }
  }
  @Input() movements: any[]
  @Input() selectedMovement: any
  
  @Input() selectedTransaction: any
  filtered : any[]
  filter: string
  @Output() select = new EventEmitter<any>()
  @Output() details = new EventEmitter<any>()
  tra: any
  @Input() type: any
  @Input() data: any
  productTypes : any[]
  constructor(
    private _movementsService: MovementsService,
    private _orderService: OrderService
  ) {
   }

  ngOnInit() {
    this.getProductTypes();
  }
  setSelectedMovement(movement) {
    this.selectedMovement = movement;
    this.select.emit({ selectedMovement: movement, selectedTransaction: this.tra})
  }
  setSelectedTransaction (transaction) {
    this.tra = transaction
    this.selectedTransaction = transaction
    this.select.emit({ selectedMovement: transaction.movements && transaction.movements.length ? transaction.movements[0] : null, selectedTransaction: transaction})
    this.showDetails(transaction)
      
  }
  

  showDetails(transaction) {
    
    this._movementsService.getDetails(transaction.type, transaction._id)
    .subscribe(res => {
      console.log(res)
      if(res.done) {
        this.data = res.data
        this.type = transaction.type
      } else {
        this.data = null
        this.type = null
      }
    }, error => {
      this.data = null
      this.type = null
    })
  }

  getProductTypes () {
    this._orderService.getProductTypes ('ENVASADO')
        .subscribe(res => { 
            if(res.done) { 
              this.productTypes = res.data
              
            } 
        })
  }

  filteringProductType(pt) {
    this.filter = pt;
    if(pt == 'all') {
      this.filtered = this.selectedMovement.items
    } else if(pt == '?') {
      let selectedMovement: any[]
      let items: any[]
      items = this.selectedMovement.items;
      this.filtered = Enumerable.from(items)
        .where(w => { return !w.product || !w.product.productType })
        .toArray();
    } else {
      let selectedMovement: any[]
      let items: any[]
      items = this.selectedMovement.items;
      this.filtered = Enumerable.from(items)
                      .where(w => { return w.product && w.product.productType && w.product.productType._id == pt })
                      .toArray();
      
    }
  }
}

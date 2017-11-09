import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovementsService } from '../../../services/movements.service'
@Component({
  selector: 'app-movements-list',
  templateUrl: './movements-list.component.html',
  styleUrls: ['./movements-list.component.css']
})
export class MovementsListComponent implements OnInit {
  @Input() movements: any[]
  @Input() selectedMovement: any
  @Input() selectedTransaction: any
  @Output() select = new EventEmitter<any>()
  @Output() details = new EventEmitter<any>()
  tra: any
  @Input() type: any
  @Input() data: any

  constructor(
    private _movementsService: MovementsService
  ) { }

  ngOnInit() {
  }
  setSelectedMovement(movement) {
    this.selectedMovement = movement;
    this.select.emit({ selectedMovement: movement, selectedTransaction: this.tra})
  }
  setSelectedTransaction (transaction) {
    this.tra = transaction
    this.selectedTransaction = transaction
    this.select.emit({ selectedMovement: null, selectedTransaction: transaction})
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
}

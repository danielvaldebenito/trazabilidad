import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-monitor-list',
  templateUrl: './order-monitor-list.component.html',
  styleUrls: ['./order-monitor-list.component.css']
})
export class OrderMonitorListComponent implements OnInit {
  @Input() data: any[]
  @Input() type: any
  @Input() selectedRange: any
  @Input() distributor: any
  @Input() filter: any
  constructor(
    
  ) { }

  ngOnInit() {
  }

  
}

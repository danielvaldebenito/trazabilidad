import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {
  @Input() clients: any[]
  @Input() fromModal: boolean = false
  @Input() filter: string
  @Output() selected = new EventEmitter<any> ()
  constructor() { }

  ngOnInit() {
  }
  onSelectClient(client) {
    this.selected.emit(client)
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movements-types',
  templateUrl: './movements-types.component.html',
  styleUrls: ['./movements-types.component.css']
})
export class MovementsTypesComponent implements OnInit {
  @Input() types: any[]
  @Output() select = new EventEmitter<string>();
  selectedType = 'VENTA'
  constructor() { }

  ngOnInit() {
  }
  onSelectType(type: string) {
    this.selectedType = type;
    this.select.emit(type)
  }
}

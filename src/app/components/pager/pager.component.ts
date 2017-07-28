import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
  @Input() pager: any = {}
  @Output() settingPage = new EventEmitter<number> ()
  constructor() { }

  ngOnInit() {
  }

  setPage (page: number) {
    this.settingPage.emit(page)
  }
}

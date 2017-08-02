import { Component, OnInit } from '@angular/core';
import { FoliosService } from '../../services/folios.service'

import * as Enumerable from 'linq'
@Component({
  selector: 'app-folios',
  templateUrl: './folios.component.html',
  styleUrls: ['./folios.component.css']
})
export class FoliosComponent implements OnInit {
  folios: any[]
  filter: string = ''
  limit: 10
  currentPage = 1
  constructor(
    private _foliosService: FoliosService
  ) { }

  ngOnInit() {
    this.getFolios()
  }
  getFolios () {
    this._foliosService
        .getFolios(this.filter, this.limit, this.currentPage)
        .subscribe(res => {
          console.log(res)
          if(res.done) {
            if(res.data) {
              this.folios = res.data.records || []
              this.folios.forEach((f) => {
                var items = []
                items = f.folios
                var totalItems = items.length
                var taked = Enumerable
                              .from(items)
                              .where((w) => { return w.taked == true })
                              .count()
                console.log('taked', taked)
                var percent = taked * 100 / totalItems
                f.percent = percent
              })
              console.log('folios', this.folios)
            }
          }
        }, err => console.log(err))

  }
  onDelete() {
    this.getFolios()
  }
  onKey () {
    this.getFolios()
  }
}

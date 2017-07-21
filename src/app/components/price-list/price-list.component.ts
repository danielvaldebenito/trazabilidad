import { Component, OnInit, Input } from '@angular/core';
import { PriceListService } from '../../services/price-list.service';
@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})

export class PriceListComponent implements OnInit {
  
  priceLists : any [] = []; 
  constructor(private _priceListService: PriceListService) { }

  ngOnInit() {
    this.getPriceLists();
  }

  getPriceLists () {
    this._priceListService.getPriceLists()
        .subscribe(
          res => {
            if(res.done) {
              var data = res.data;
              this.priceLists = data;
            }
          },
          error => console.log(error)
        )
  }
  onDelete() {
    this.getPriceLists();
  }
}

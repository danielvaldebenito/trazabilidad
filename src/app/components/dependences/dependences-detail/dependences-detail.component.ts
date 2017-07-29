import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dependences-detail',
  templateUrl: './dependences-detail.component.html',
  styleUrls: ['./dependences-detail.component.css']
})
export class DependencesDetailComponent implements OnInit {
  @Input() dependence: any
  constructor() { }

  ngOnInit() {
  }

}

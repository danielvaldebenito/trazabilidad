import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListListComponent } from './price-list-list.component';

describe('PriceListListComponent', () => {
  let component: PriceListListComponent;
  let fixture: ComponentFixture<PriceListListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceListListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

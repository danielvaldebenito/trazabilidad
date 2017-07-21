import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListDetailComponent } from './price-list-detail.component';

describe('PriceListDetailComponent', () => {
  let component: PriceListDetailComponent;
  let fixture: ComponentFixture<PriceListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

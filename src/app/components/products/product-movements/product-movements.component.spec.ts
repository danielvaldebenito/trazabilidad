import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMovementsComponent } from './product-movements.component';

describe('ProductMovementsComponent', () => {
  let component: ProductMovementsComponent;
  let fixture: ComponentFixture<ProductMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLastPositionComponent } from './product-last-position.component';

describe('ProductLastPositionComponent', () => {
  let component: ProductLastPositionComponent;
  let fixture: ComponentFixture<ProductLastPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductLastPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLastPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

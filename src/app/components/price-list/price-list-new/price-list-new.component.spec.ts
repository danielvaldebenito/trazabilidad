import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListNewComponent } from './price-list-new.component';

describe('PriceListNewComponent', () => {
  let component: PriceListNewComponent;
  let fixture: ComponentFixture<PriceListNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceListNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

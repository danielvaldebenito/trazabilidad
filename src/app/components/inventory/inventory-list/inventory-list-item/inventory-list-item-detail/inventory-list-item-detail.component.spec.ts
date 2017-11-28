import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryListItemDetailComponent } from './inventory-list-item-detail.component';

describe('InventoryListItemDetailComponent', () => {
  let component: InventoryListItemDetailComponent;
  let fixture: ComponentFixture<InventoryListItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryListItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryListItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

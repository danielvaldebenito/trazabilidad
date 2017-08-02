import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoliosListComponent } from './folios-list.component';

describe('FoliosListComponent', () => {
  let component: FoliosListComponent;
  let fixture: ComponentFixture<FoliosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoliosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoliosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

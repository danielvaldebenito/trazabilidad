import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoliosNewComponent } from './folios-new.component';

describe('FoliosNewComponent', () => {
  let component: FoliosNewComponent;
  let fixture: ComponentFixture<FoliosNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoliosNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoliosNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

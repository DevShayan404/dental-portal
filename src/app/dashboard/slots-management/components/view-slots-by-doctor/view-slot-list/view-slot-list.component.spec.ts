import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSlotListComponent } from './view-slot-list.component';

describe('ViewSlotListComponent', () => {
  let component: ViewSlotListComponent;
  let fixture: ComponentFixture<ViewSlotListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSlotListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSlotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

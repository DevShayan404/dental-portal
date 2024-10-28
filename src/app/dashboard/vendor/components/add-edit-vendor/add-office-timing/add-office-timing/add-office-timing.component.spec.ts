import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfficeTimingComponent } from './add-office-timing.component';

describe('AddOfficeTimingComponent', () => {
  let component: AddOfficeTimingComponent;
  let fixture: ComponentFixture<AddOfficeTimingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOfficeTimingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOfficeTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

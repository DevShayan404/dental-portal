import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVendorDoctorComponent } from './add-edit-vendor-doctor.component';

describe('AddEditVendorDoctorComponent', () => {
  let component: AddEditVendorDoctorComponent;
  let fixture: ComponentFixture<AddEditVendorDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditVendorDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditVendorDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

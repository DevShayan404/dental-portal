import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditServiceVendorDoctorComponent } from './add-edit-service-vendor-doctor.component';

describe('AddEditServiceVendorDoctorComponent', () => {
  let component: AddEditServiceVendorDoctorComponent;
  let fixture: ComponentFixture<AddEditServiceVendorDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditServiceVendorDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditServiceVendorDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

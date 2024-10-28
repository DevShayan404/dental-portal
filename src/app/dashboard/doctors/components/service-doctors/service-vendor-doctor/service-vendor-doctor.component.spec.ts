import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceVendorDoctorComponent } from './service-vendor-doctor.component';

describe('ServiceVendorDoctorComponent', () => {
  let component: ServiceVendorDoctorComponent;
  let fixture: ComponentFixture<ServiceVendorDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceVendorDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceVendorDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

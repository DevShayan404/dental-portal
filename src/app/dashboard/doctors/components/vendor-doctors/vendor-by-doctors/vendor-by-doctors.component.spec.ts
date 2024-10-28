import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorByDoctorsComponent } from './vendor-by-doctors.component';

describe('VendorByDoctorsComponent', () => {
  let component: VendorByDoctorsComponent;
  let fixture: ComponentFixture<VendorByDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorByDoctorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorByDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

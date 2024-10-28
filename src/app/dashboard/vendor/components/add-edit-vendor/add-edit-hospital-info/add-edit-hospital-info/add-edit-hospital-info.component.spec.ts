import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditHospitalInfoComponent } from './add-edit-hospital-info.component';

describe('AddEditHospitalInfoComponent', () => {
  let component: AddEditHospitalInfoComponent;
  let fixture: ComponentFixture<AddEditHospitalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditHospitalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditHospitalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

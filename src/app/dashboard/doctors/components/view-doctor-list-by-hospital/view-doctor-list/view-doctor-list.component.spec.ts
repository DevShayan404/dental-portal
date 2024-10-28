import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDoctorListComponent } from './view-doctor-list.component';

describe('ViewDoctorListComponent', () => {
  let component: ViewDoctorListComponent;
  let fixture: ComponentFixture<ViewDoctorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDoctorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDoctorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

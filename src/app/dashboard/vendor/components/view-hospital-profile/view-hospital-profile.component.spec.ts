import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHospitalProfileComponent } from './view-hospital-profile.component';

describe('ViewHospitalProfileComponent', () => {
  let component: ViewHospitalProfileComponent;
  let fixture: ComponentFixture<ViewHospitalProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHospitalProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHospitalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

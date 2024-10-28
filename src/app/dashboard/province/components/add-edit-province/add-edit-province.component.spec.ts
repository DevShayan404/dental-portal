import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProvinceComponent } from './add-edit-province.component';

describe('AddEditProvinceComponent', () => {
  let component: AddEditProvinceComponent;
  let fixture: ComponentFixture<AddEditProvinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditProvinceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

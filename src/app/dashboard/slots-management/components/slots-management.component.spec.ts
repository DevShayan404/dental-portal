import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotsManagementComponent } from './slots-management.component';

describe('SlotsManagementComponent', () => {
  let component: SlotsManagementComponent;
  let fixture: ComponentFixture<SlotsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotsManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

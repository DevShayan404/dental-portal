import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFollowUpComponent } from './add-edit-follow-up.component';

describe('AddEditFollowUpComponent', () => {
  let component: AddEditFollowUpComponent;
  let fixture: ComponentFixture<AddEditFollowUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFollowUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

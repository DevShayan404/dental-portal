import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPasswordComponent } from './view-password.component';

describe('ViewPasswordComponent', () => {
  let component: ViewPasswordComponent;
  let fixture: ComponentFixture<ViewPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPasswordComponent]
    });
    fixture = TestBed.createComponent(ViewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

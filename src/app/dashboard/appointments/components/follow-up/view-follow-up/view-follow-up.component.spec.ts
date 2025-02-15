import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFollowUpComponent } from './view-follow-up.component';

describe('ViewFollowUpComponent', () => {
  let component: ViewFollowUpComponent;
  let fixture: ComponentFixture<ViewFollowUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFollowUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

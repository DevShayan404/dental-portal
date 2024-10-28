import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDynamicDialogComponent } from './delete-dynamic-dialog.component';

describe('DeleteDynamicDialogComponent', () => {
  let component: DeleteDynamicDialogComponent;
  let fixture: ComponentFixture<DeleteDynamicDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDynamicDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDynamicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

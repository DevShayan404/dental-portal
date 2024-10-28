import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByRoleComponent } from './search-by-role.component';

describe('SearchByRoleComponent', () => {
  let component: SearchByRoleComponent;
  let fixture: ComponentFixture<SearchByRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchByRoleComponent]
    });
    fixture = TestBed.createComponent(SearchByRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

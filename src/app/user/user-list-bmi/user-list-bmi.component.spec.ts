import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListBmiComponent } from './user-list-bmi.component';

describe('UserListBmiComponent', () => {
  let component: UserListBmiComponent;
  let fixture: ComponentFixture<UserListBmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListBmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListBmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

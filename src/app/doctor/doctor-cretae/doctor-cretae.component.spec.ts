import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCretaeComponent } from './doctor-cretae.component';

describe('DoctorCretaeComponent', () => {
  let component: DoctorCretaeComponent;
  let fixture: ComponentFixture<DoctorCretaeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorCretaeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorCretaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

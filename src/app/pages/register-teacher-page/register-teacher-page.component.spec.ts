import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTeacherPageComponent } from './register-teacher-page.component';

describe('RegisterTeacherPageComponent', () => {
  let component: RegisterTeacherPageComponent;
  let fixture: ComponentFixture<RegisterTeacherPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterTeacherPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterTeacherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

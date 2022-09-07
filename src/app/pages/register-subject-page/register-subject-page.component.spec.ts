import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSubjectPageComponent } from './register-subject-page.component';

describe('RegisterSubjectPageComponent', () => {
  let component: RegisterSubjectPageComponent;
  let fixture: ComponentFixture<RegisterSubjectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSubjectPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSubjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

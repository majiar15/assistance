import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceViewPageComponent } from './assistance-view-page.component';

describe('AssistanceViewPageComponent', () => {
  let component: AssistanceViewPageComponent;
  let fixture: ComponentFixture<AssistanceViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistanceViewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistanceViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

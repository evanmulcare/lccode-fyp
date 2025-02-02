import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSingleViewComponent } from './exam-single-view.component';

describe('ExamSingleViewComponent', () => {
  let component: ExamSingleViewComponent;
  let fixture: ComponentFixture<ExamSingleViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamSingleViewComponent]
    });
    fixture = TestBed.createComponent(ExamSingleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

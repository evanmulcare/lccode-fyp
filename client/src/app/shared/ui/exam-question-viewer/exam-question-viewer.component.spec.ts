import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamQuestionViewerComponent } from './exam-question-viewer.component';

describe('ExamQuestionViewerComponent', () => {
  let component: ExamQuestionViewerComponent;
  let fixture: ComponentFixture<ExamQuestionViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamQuestionViewerComponent]
    });
    fixture = TestBed.createComponent(ExamQuestionViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetQuestionCardComponent } from './worksheet-question-card.component';

describe('WorksheetQuestionCardComponent', () => {
  let component: WorksheetQuestionCardComponent;
  let fixture: ComponentFixture<WorksheetQuestionCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorksheetQuestionCardComponent]
    });
    fixture = TestBed.createComponent(WorksheetQuestionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

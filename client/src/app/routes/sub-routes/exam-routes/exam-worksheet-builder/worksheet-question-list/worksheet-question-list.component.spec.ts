import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetQuestionListComponent } from './worksheet-question-list.component';

describe('WorksheetQuestionListComponent', () => {
  let component: WorksheetQuestionListComponent;
  let fixture: ComponentFixture<WorksheetQuestionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorksheetQuestionListComponent]
    });
    fixture = TestBed.createComponent(WorksheetQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

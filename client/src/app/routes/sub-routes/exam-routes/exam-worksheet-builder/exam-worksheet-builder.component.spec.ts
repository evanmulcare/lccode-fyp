import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamWorksheetBuilderComponent } from './exam-worksheet-builder.component';

describe('ExamWorksheetBuilderComponent', () => {
  let component: ExamWorksheetBuilderComponent;
  let fixture: ComponentFixture<ExamWorksheetBuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamWorksheetBuilderComponent]
    });
    fixture = TestBed.createComponent(ExamWorksheetBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

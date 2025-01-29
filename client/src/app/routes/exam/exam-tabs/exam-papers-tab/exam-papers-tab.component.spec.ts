import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPapersTabComponent } from './exam-papers-tab.component';

describe('ExamPapersTabComponent', () => {
  let component: ExamPapersTabComponent;
  let fixture: ComponentFixture<ExamPapersTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamPapersTabComponent],
    });
    fixture = TestBed.createComponent(ExamPapersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

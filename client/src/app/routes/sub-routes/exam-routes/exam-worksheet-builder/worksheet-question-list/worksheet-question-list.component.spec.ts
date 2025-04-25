import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorksheetQuestionListComponent } from './worksheet-question-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 

describe('WorksheetQuestionListComponent', () => {
  let component: WorksheetQuestionListComponent;
  let fixture: ComponentFixture<WorksheetQuestionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorksheetQuestionListComponent],
      imports: [FontAwesomeModule],
    });

    fixture = TestBed.createComponent(WorksheetQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

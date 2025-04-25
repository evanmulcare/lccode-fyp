import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExamWorksheetBuilderComponent } from './exam-worksheet-builder.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from 'environments/environment';
import { QuestionService } from 'src/app/shared/services/firebase/question.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularSplitModule } from 'angular-split';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { WorksheetQuestionListComponent } from './worksheet-question-list/worksheet-question-list.component';

describe('ExamWorksheetBuilderComponent', () => {
  let component: ExamWorksheetBuilderComponent;
  let fixture: ComponentFixture<ExamWorksheetBuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExamWorksheetBuilderComponent,
        WorksheetQuestionListComponent,
      ],
      imports: [
        HttpClientTestingModule,
        AngularSplitModule,
        FontAwesomeModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [AngularFireAuth, QuestionService],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamWorksheetBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

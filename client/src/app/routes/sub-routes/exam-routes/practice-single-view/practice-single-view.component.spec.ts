import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PracticeSingleViewComponent } from './practice-single-view.component';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/shared/services/firebase/question.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuestionCardComponent } from './question-card/question-card.component';

class ActivatedRouteStub {
  snapshot = { paramMap: { get: () => '123' } }; 
}

describe('PracticeSingleViewComponent', () => {
  let component: PracticeSingleViewComponent;
  let fixture: ComponentFixture<PracticeSingleViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [PracticeSingleViewComponent, QuestionCardComponent],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }, 
        {
          provide: QuestionService,
          useValue: {
            getExamQuestionById: jasmine
              .createSpy()
              .and.returnValue(
                Promise.resolve({ id: '123', question: 'Test question' })
              ),
            isQuestionCompleted: jasmine
              .createSpy()
              .and.returnValue(Promise.resolve(false)),
            markAsComplete: jasmine
              .createSpy()
              .and.returnValue(Promise.resolve(true)),
            markAsNotComplete: jasmine
              .createSpy()
              .and.returnValue(Promise.resolve(true)),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PracticeSingleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

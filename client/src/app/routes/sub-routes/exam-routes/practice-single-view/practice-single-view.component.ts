import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ExamQuestion } from 'src/app/models/exam-question';
import { QuestionService } from 'src/app/shared/services/firebase/question.service';

@Component({
  selector: 'app-practice-single-view',
  templateUrl: './practice-single-view.component.html',
})
export class PracticeSingleViewComponent {
  icons = {
    faChevronLeft,
    faTimes,
  };
  isFlipped = false;
  questionData: ExamQuestion | null = null;
  questionId: string = '';
  isQuestionCompleted = false;
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  isOverlayVisible = false;

  toggleOverlay() {
    this.isOverlayVisible = !this.isOverlayVisible;
  }

  closeOverlay() {
    this.isOverlayVisible = false;
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  async ngOnInit() {
    await this.loadExamQuestion();
    this.isQuestionCompleted = await this.questionService.isQuestionCompleted(
      this.questionId
    );
  }

  async loadExamQuestion() {
    const questionId = this.route.snapshot.paramMap.get('question');
    if (!questionId) return;

    const question = await this.questionService.getExamQuestionById(questionId);
    if (question) {
      this.questionData = question;
      this.questionId = question.id;
    }
  }

  async markAsComplete() {
    if (!this.questionData?.id) return;

    const completed = await this.questionService.markAsComplete(
      this.questionData.id,
      'question'
    );

    if (completed) {
      this.isQuestionCompleted = true;
    }
  }

  async markAsNotComplete() {
    if (!this.questionData?.id) return;

    const success = await this.questionService.markAsNotComplete(
      this.questionData.id
    );

    if (success) {
      this.isQuestionCompleted = false;
    }
  }
}

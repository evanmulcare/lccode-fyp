import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodeQuestion } from 'src/app/models/code-question';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { QuestionService } from 'src/app/shared/services/firebase/question.service';

@Component({
  selector: 'app-code-practice-single-view',
  templateUrl: './code-practice-single-view.component.html',
  styleUrls: ['./code-practice-single-view.component.css'],
})
export class CodePracticeSingleViewComponent {
  icons = {
    faChevronLeft,
    faTimes,
  };

  questionData: CodeQuestion | null = null;
  questionId: string = '';
  isQuestionCompleted = false;
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  async ngOnInit() {
    await this.loadCodeQuestion();
    this.isQuestionCompleted = await this.questionService.isQuestionCompleted(this.questionId);
  }

  async loadCodeQuestion() {
    const questionId = this.route.snapshot.paramMap.get('question');
    if (!questionId) return;
  
    const question = await this.questionService.getCodeQuestionById(questionId);
  
    if (question) {
      this.questionData = question;
      this.questionId = question.id;
    }
  }  

  async markAsComplete() {
    if (!this.questionData?.id) {
      console.error('Question ID missing');
      return;
    }

    const result = await this.questionService.markAsComplete(
      this.questionData.id,
      'question'
    );

    if (result) {
      this.isQuestionCompleted = true;
    }
  }

  async markAsNotComplete() {
    if (!this.questionData?.id) {
      console.error('Question ID missing');
      return;
    }

    const success = await this.questionService.markAsNotComplete(
      this.questionData.id
    );

    if (success) {
      this.isQuestionCompleted = false;
    }
  }
}

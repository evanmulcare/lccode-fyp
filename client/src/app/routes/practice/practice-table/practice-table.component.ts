import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faCheck,
  faCode,
  faPen,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { ExamQuestion } from 'src/app/models/exam-question';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { CodeQuestion } from 'src/app/models/code-question';
import { QuestionService } from 'src/app/shared/services/firebase/question.service';
@Component({
  selector: 'app-practice-table',
  templateUrl: './practice-table.component.html',
  styleUrls: ['./practice-table.component.css'],
})
export class PracticeTableComponent {
  questions: (ExamQuestion | CodeQuestion)[] = [];
  paginatedQuestions: (ExamQuestion | CodeQuestion)[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  filteredQuestions: (ExamQuestion | CodeQuestion)[] = [];
  topics: string[] = [];
  types: string[] = [];
  selectedTopic: string = '';
  selectedType: string = '';
  searchQuery: string = '';

  icons = {
    faCheck,
    faCode,
    faPen,
    faArrowLeft,
    faArrowRight,
  };

  constructor(
    private router: Router,
    private auth: AuthService,
    private questionService: QuestionService
  ) {}

  async ngOnInit() {
    this.questions = [];
    const loadedExamQuestions =  await this.questionService.loadExamQuestions();;
    const loadedCodeQuestions = await this.questionService.loadCodeQuestions();
    this.questions.push(...loadedExamQuestions, ...loadedCodeQuestions);

    const user = this.auth.getCurrentUser();

    this.questions.forEach((question) => {
      if (
        user?.completedLessons.some((lesson) => lesson.lessonId === question.id)
      ) {
        question.isComplete = true;
      }
    });

    this.updatePaginatedQuestions();
    this.extractFilterOptions();
    this.applyFilters();
  }

  extractFilterOptions() {
    const topicsSet = new Set<string>();
    const typesSet = new Set<string>();

    this.questions.forEach((q) => {
      topicsSet.add(q.topic);
      typesSet.add(q.type);
    });

    this.topics = Array.from(topicsSet);
    this.types = Array.from(typesSet);
  }

  applyFilters() {
    this.filteredQuestions = this.questions.filter((question) => {
      const matchesSearch = question.question
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase());
      const matchesTopic = this.selectedTopic
        ? question.topic === this.selectedTopic
        : true;
      const matchesType = this.selectedType
        ? question.type === this.selectedType
        : true;

      return matchesSearch && matchesTopic && matchesType;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.questions.length / this.itemsPerPage);
  }

  updatePaginatedQuestions() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedQuestions = this.questions.slice(start, end);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.questions.length) {
      this.currentPage++;
      this.updatePaginatedQuestions();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedQuestions();
    }
  }
  
  navigateToQuestion(questionType: string, questionId: string) {
    if (questionType == 'Coding') {
      this.router.navigate(['/practice/questions/coding/', questionId]);
    } else {
      this.router.navigate(['/practice/questions', questionId]);
    }
  }

  toggleStatus(question: ExamQuestion | CodeQuestion) {
    if (question.isComplete == true) {
      this.markAsNotComplete(question.id);
    } else {
      this.markAsComplete(question.id);
    }
    question.isComplete = !question.isComplete;
  }

  async markAsComplete(questionId: string) {
    const completed = await this.questionService.markAsComplete(
      questionId,
      'question'
    );

    if (completed) {
      const updatedQuestion = this.questions.find((q) => q.id === questionId);
      if (updatedQuestion) updatedQuestion.isComplete = true;
    }
  }

  async markAsNotComplete(questionId: string) {
    const success = await this.questionService.markAsNotComplete(questionId);

    if (success) {
      const updatedQuestion = this.questions.find((q) => q.id === questionId);
      if (updatedQuestion) updatedQuestion.isComplete = false;
    }
  }
}

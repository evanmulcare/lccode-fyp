import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCheck, faCode, faPen } from '@fortawesome/free-solid-svg-icons';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/shared/services/temp/question.service';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import { ExamQuestion } from 'src/app/models/exam-question';

@Component({
  selector: 'app-practice-table',
  templateUrl: './practice-table.component.html',
  styleUrls: ['./practice-table.component.css'],
})
export class PracticeTableComponent {
  questions: ExamQuestion[] = [];

  icons = {
    faCheck,
    faCode,
    faPen,
  };

  constructor(
    private router: Router,
    private questionService: QuestionService
  ) {}

  ngOnInit() {
    this.loadExamQuestions();
  }

  async loadExamQuestions() {
    try {
      const db = getFirestore();
      const examQuestionsCollection = collection(db, 'exam-questions');
      const examQuery = query(examQuestionsCollection);

      const querySnapshot = await getDocs(examQuery);

      // Clear previous data
      this.questions = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        // Create the questionData object
        const questionData: ExamQuestion = {
          id: doc.id,
          question: data['question'] || 'test',
          order: data['order'],
          topic: data['topic'],
          year: data['year'],
          section: data['section'],
          description: data['description'],
          isComplete: data['isComplete'] || false,
          style: data['style'] || 'exam',
          type: data['type'] || 'Short Answer',
          level: data['level'] || 'N/A',
          'IMG-URL': data['IMG-URL'],
          'PDF-URL': data['PDF-URL'],
          'MARKING-IMG-URL': data['MARKING-IMG-URL'],
          'MARKING-PDF-URL': data['MARKING-PDF-URL'],
        };

        this.questions.push(questionData);
      });
    } catch (error) {
      console.error('Error loading exam questions:', error);
    }
  }

  navigateToQuestion(questionId: string) {
    this.router.navigate(['/practice/questions', questionId]);
  }

  toggleStatus(question: ExamQuestion) {
    question.isComplete = !question.isComplete;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCheck, faCode, faPen } from '@fortawesome/free-solid-svg-icons';
import { ExamQuestion } from 'src/app/models/exam-question';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDocs,
  query,
} from 'firebase/firestore';
import { CompletedLesson, User } from 'src/app/models/user';

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

  constructor(private router: Router, private auth: AuthService) {}

  async ngOnInit() {
    await this.loadExamQuestions();
    const user = this.auth.getCurrentUser();

    this.questions.forEach((question) => {
      if (
        user?.completedLessons.some((lesson) => lesson.lessonId === question.id)
      ) {
        question.isComplete = true;
      }
    });
  }
  async getQuestionCompletionStatus(questionId: string): Promise<boolean> {
    const user = this.auth.getCurrentUser();
    return (
      user?.completedLessons.some((lesson) => lesson.lessonId === questionId) ??
      false
    );
  }

  async loadExamQuestions() {
    try {
      const db = getFirestore();
      const examQuestionsCollection = collection(db, 'exam-questions');
      const examQuery = query(examQuestionsCollection);

      const querySnapshot = await getDocs(examQuery);

      this.questions = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        const questionData: ExamQuestion = {
          id: doc.id,
          question: data['question'] || 'test',
          order: data['order'],
          topic: data['topic'],
          year: data['year'],
          section: data['section'],
          description: data['description'],
          isComplete: false,
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
    if (question.isComplete == true) {
      this.markAsNotComplete(question.id);
    } else {
      this.markAsComplete(question.id);
    }
    question.isComplete = !question.isComplete;
  }

  async markAsComplete(questionId: string) {
    const user = this.auth.getCurrentUser();
    if (!user) {
      console.error('User or question ID missing');
      return;
    }

    try {
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const userDocRef = doc(usersCollection, user.id);

      const completedLesson: CompletedLesson = {
        lessonId: questionId,
        completedAt: Date.now(),
        type: 'question',
      };

      await updateDoc(userDocRef, {
        completedLessons: arrayUnion(completedLesson),
      });

      const updatedUser: User = {
        ...user,
        completedLessons: [...user.completedLessons, completedLesson],
      };

      this.auth.setCurrentUser(updatedUser);

      const updatedQuestion = this.questions.find((q) => q.id === questionId);
      if (updatedQuestion) updatedQuestion.isComplete = true;
    } catch (error) {
      console.error('Error marking as complete:', error);
    }
  }

  async markAsNotComplete(questionId: string) {
    const user = this.auth.getCurrentUser();
    if (!user) {
      console.error('User or question ID missing');
      return;
    }

    try {
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const userDocRef = doc(usersCollection, user.id);

      const lessonToRemove = user.completedLessons.find(
        (lesson) => lesson.lessonId === questionId
      );
      if (!lessonToRemove) return;

      await updateDoc(userDocRef, {
        completedLessons: arrayRemove(lessonToRemove),
      });

      const updatedUser = {
        ...user,
        completedLessons: user.completedLessons.filter(
          (lesson) => lesson.lessonId !== questionId
        ),
      };

      this.auth.setCurrentUser(updatedUser);

      const updatedQuestion = this.questions.find((q) => q.id === questionId);
      if (updatedQuestion) updatedQuestion.isComplete = false;
    } catch (error) {
      console.error('Error marking as not complete:', error);
    }
  }
}

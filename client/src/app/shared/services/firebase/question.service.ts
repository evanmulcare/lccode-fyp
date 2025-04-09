import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  getFirestore,
  doc,
  collection,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDocs,
  query,
  where,
  orderBy,
  QueryConstraint,
  getDoc,
} from 'firebase/firestore';
import { CompletedLesson } from 'src/app/models/user';
import { ExamQuestion } from 'src/app/models/exam-question';
import { CodeQuestion } from 'src/app/models/code-question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private auth: AuthService) {}

  async loadExamQuestions(options?: {
    year?: number;
    level?: string;
    orderByField?: string;
  }): Promise<ExamQuestion[]> {
    const db = getFirestore();
    const examQuestionsCollection = collection(db, 'exam-questions');

    const constraints: QueryConstraint[] = [];

    if (options?.year) {
      constraints.push(where('year', '==', options.year));
    }

    if (options?.level) {
      constraints.push(where('level', '==', options.level));
    }

    if (options?.orderByField) {
      constraints.push(orderBy(options.orderByField));
    }

    const examQuery = query(examQuestionsCollection, ...constraints);
    const querySnapshot = await getDocs(examQuery);

    const questions: ExamQuestion[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();

      const question: ExamQuestion = {
        id: docSnap.id,
        question: data['question'] || '',
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

      questions.push(question);
    });

    return questions;
  }

  async loadCodeQuestions(): Promise<CodeQuestion[]> {
    try {
      const db = getFirestore();
      const codeQuestionsCollection = collection(db, 'code-questions');
      const codeQuery = query(codeQuestionsCollection);
  
      const querySnapshot = await getDocs(codeQuery);
      const questions: CodeQuestion[] = [];
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
  
        const questionData: CodeQuestion = {
          id: doc.id,
          question: data['question'] || 'test',
          topic: data['topic'],
          description: data['description'],
          isComplete: false,
          style: data['style'] || 'code',
          type: data['type'] || '',
          source: data['source'] || '',
          basecodesource: data['basecode-source'],
        };
  
        if (data['placeholder']) {
          questionData.placeholder = data['placeholder'];
        }
  
        if (data['testcases'] && Array.isArray(data['testcases'])) {
          questionData.testcases = data['testcases'].map((testCase: any) => ({
            input: testCase.input || '',
            expected_output: testCase.expected_output || '',
          }));
        }
  
        questions.push(questionData);
      });
  
      return questions;
    } catch (error) {
      console.error('Error loading code questions:', error);
      return [];
    }
  }

  async getExamQuestionById(questionId: string): Promise<ExamQuestion | null> {
    try {
      const db = getFirestore();
      const docRef = doc(db, 'exam-questions', questionId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.error('error loading exam question.');
        return null;
      }

      const data = docSnap.data();

      return {
        id: docSnap.id,
        question: data['question'] || 'No question available',
        order: data['order'],
        topic: data['topic'],
        year: data['year'],
        section: data['section'],
        description: data['description'],
        isComplete: data['isComplete'] || false,
        style: data['style'] || 'Default',
        type: data['type'] || 'Default',
        level: data['level'] || 'N/A',
        'IMG-URL': data['IMG-URL'],
        'PDF-URL': data['PDF-URL'],
        'MARKING-IMG-URL': data['MARKING-IMG-URL'],
        'MARKING-PDF-URL': data['MARKING-PDF-URL'],
      };
    } catch (error) {
      console.error('Error fetching question by ID:', error);
      return null;
    }
  }

  async getCodeQuestionById(questionId: string): Promise<CodeQuestion | null> {
    try {
      const db = getFirestore();
      const docRef = doc(db, 'code-questions', questionId);
      const docSnap = await getDoc(docRef);
  
      if (!docSnap.exists()) {
        console.error('No such document!');
        return null;
      }
  
      const data = docSnap.data();
  
      const question: CodeQuestion = {
        id: docSnap.id,
        question: data['question'] || 'test',
        topic: data['topic'],
        description: data['description'],
        isComplete: false,
        style: data['style'] || 'code',
        type: data['type'] || '',
        source: data['source'] || '',
        basecodesource: data['basecode-source'],
      };
  
      if (data['placeholder']) {
        question.placeholder = data['placeholder'];
      }
  
      if (Array.isArray(data['testcases'])) {
        question.testcases = data['testcases'].map((testCase: any) => ({
          input: testCase.input || '',
          expected_output: testCase.expected_output || '',
        }));
      }
  
      return question;
    } catch (error) {
      console.error('Error loading code question:', error);
      return null;
    }
  }
  
  async markAsComplete(
    lessonId: string,
    type: 'lesson' | 'question'
  ): Promise<CompletedLesson | null> {
    const user = this.auth.getCurrentUser();
    if (!user || !lessonId) {
      console.error('User or lesson ID missing');
      return null;
    }

    try {
      const db = getFirestore();
      const userDocRef = doc(collection(db, 'users'), user.id);

      const completedLesson: CompletedLesson = {
        lessonId,
        completedAt: Date.now(),
        type,
      };

      await updateDoc(userDocRef, {
        completedLessons: arrayUnion(completedLesson),
      });

      const updatedUser = {
        ...user,
        completedLessons: [...user.completedLessons, completedLesson],
      };

      this.auth.setCurrentUser(updatedUser);
      return completedLesson;
    } catch (error) {
      console.error('Error marking as complete:', error);
      return null;
    }
  }

  async markAsNotComplete(lessonId: string): Promise<boolean> {
    const user = this.auth.getCurrentUser();
    if (!user || !lessonId) {
      console.error('User or lesson ID missing');
      return false;
    }

    const lessonToRemove = user.completedLessons.find(
      (lesson) => lesson.lessonId === lessonId
    );

    if (!lessonToRemove) return false;

    try {
      const db = getFirestore();
      const userDocRef = doc(collection(db, 'users'), user.id);

      await updateDoc(userDocRef, {
        completedLessons: arrayRemove(lessonToRemove),
      });

      const updatedUser = {
        ...user,
        completedLessons: user.completedLessons.filter(
          (lesson) => lesson.lessonId !== lessonId
        ),
      };

      this.auth.setCurrentUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Error marking as not complete:', error);
      return false;
    }
  }

  async isQuestionCompleted(questionId: string): Promise<boolean> {
    const user = this.auth.getCurrentUser();
    return (
      user?.completedLessons.some(
        (lesson) => lesson.lessonId === questionId
      ) ?? false
    );
  }
}

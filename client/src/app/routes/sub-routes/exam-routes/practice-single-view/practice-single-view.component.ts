import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore';
import { ExamQuestion } from 'src/app/models/exam-question';
import { CompletedLesson } from 'src/app/models/user';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';

@Component({
  selector: 'app-practice-single-view',
  templateUrl: './practice-single-view.component.html',
  styleUrls: ['./practice-single-view.component.css'],
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
  constructor(private route: ActivatedRoute, private auth: AuthService) {}

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
    this.isQuestionCompleted = await this.getQuestionCompletionStatus();
  }

  async getQuestionCompletionStatus(): Promise<boolean> {
    const user = this.auth.getCurrentUser();
    return (
      user?.completedLessons.some(
        (lesson) => lesson.lessonId === this.questionId
      ) ?? false
    );
  }

  async loadExamQuestion() {
    try {
      const questionId = this.route.snapshot.paramMap.get('question');

      if (questionId) {
        const db = getFirestore();
        const docRef = doc(db, 'exam-questions', questionId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          this.questionData = {
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
          this.questionId = this.questionData.id;
        } else {
          console.log('No such document!');
        }
      }
    } catch (error) {
      console.error('Error loading exam question:', error);
    }
  }

  async markAsComplete() {
    const user = this.auth.getCurrentUser();
    if (!user || !this.questionData?.id) {
      console.error('User or question ID missing');
      return;
    }

    try {
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const userDocRef = doc(usersCollection, user.id);

      const completedLesson: CompletedLesson = {
        lessonId: this.questionData.id,
        completedAt: Date.now(),
        type: 'question',
      };

      await updateDoc(userDocRef, {
        completedLessons: arrayUnion(completedLesson),
      });

      const updatedUser = {
        ...user,
        completedLessons: [...user.completedLessons, completedLesson],
      };

      this.auth.setCurrentUser(updatedUser);
      this.isQuestionCompleted = true;
    } catch (error) {
      console.error('Error marking as complete:', error);
    }
  }

  async markAsNotComplete() {
    const user = this.auth.getCurrentUser();
    if (!user || !this.questionData?.id) {
      console.error('User or question ID missing');
      return;
    }

    try {
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const userDocRef = doc(usersCollection, user.id);

      const lessonToRemove = user.completedLessons.find(
        (lesson) => lesson.lessonId === this.questionData?.id
      );
      if (!lessonToRemove) return;

      await updateDoc(userDocRef, {
        completedLessons: arrayRemove(lessonToRemove),
      });

      const updatedUser = {
        ...user,
        completedLessons: user.completedLessons.filter(
          (lesson) => lesson.lessonId !== this.questionData?.id
        ),
      };

      this.auth.setCurrentUser(updatedUser);
      this.isQuestionCompleted = false;
    } catch (error) {
      console.error('Error marking as not complete:', error);
    }
  }
}

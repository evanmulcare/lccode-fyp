import { Component, OnInit } from '@angular/core';
import { CompletedLesson, User } from 'src/app/models/user';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Question } from 'src/app/models/question';
import { Lesson } from 'src/app/models/lesson';
import { SimplifiedCourse } from 'src/app/models/simplified-course';

import {
  faPlay,
  faCheck,
  faCode,
  faPen,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
})
export class ProgressComponent implements OnInit {
  faPlay = faPlay;
  icons = {
    faCheck,
    faCode,
    faPen,
    faPlay,
  };
  currentUser: User | null = null;
  recentQuestions: CompletedLesson[] = [];
  mostRecentLesson: CompletedLesson | null = null;
  mostRecentLessonData: Lesson | null = null;
  mostRecentCourse: SimplifiedCourse | null = null;
  recentQuestionDetails: (Question & { completedAt: number })[] = [];
  sectionCounts = {
    A: 0,
    B: 0,
    C: 0,
  };
  totalQuestions = {
    A: 20,
    B: 15,
    C: 32,
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;

      this.mostRecentCourse = this.mostRecentCourse || {
        id: 'HrL6tgLIGQ6S1MFBjy10',
        title: 'Introduction',
        category: 'General',
      };

      this.mostRecentLessonData = this.mostRecentLessonData || {
        id: 'gj9pHivs83gB2yvrQj1F',
        content: 'tester - Why LCCode',
        courseId: 'HrL6tgLIGQ6S1MFBjy10',
        type: 'lesson',
        order: 1,
        src: '',
        videoSrc: '',
        isComplete: false,
      };

      if (user?.completedLessons) {
        this.recentQuestions = user.completedLessons
          .filter((lesson) => lesson.type === 'question')
          .sort((a, b) => b.completedAt - a.completedAt)
          .slice(0, 5);

        this.mostRecentLesson = this.findMostRecentLesson(
          user.completedLessons
        );

        if (this.mostRecentLesson) {
          this.GetMostRecentCourse(this.mostRecentLesson);
        }
        this.GetMostRecentQuestions();
      }
    });
  }

  findMostRecentLesson(
    completedLessons: CompletedLesson[]
  ): CompletedLesson | null {
    const lessonLessons = completedLessons.filter(
      (lesson) => lesson.type === 'lesson'
    );

    if (lessonLessons.length === 0) {
      return null;
    }

    return lessonLessons.sort((a, b) => b.completedAt - a.completedAt)[0];
  }

  async GetMostRecentCourse(mostRecentLesson: CompletedLesson): Promise<void> {
    try {
      const db = getFirestore();

      const lessonRef = doc(db, 'lessons', mostRecentLesson.lessonId);
      const lessonDoc = await getDoc(lessonRef);

      if (lessonDoc.exists()) {
        const lessonData = lessonDoc.data();
        const courseId = lessonData['courseId'];

        const courseRef = doc(db, 'courses', courseId);
        const courseDoc = await getDoc(courseRef);

        if (courseDoc.exists()) {
          const courseData = courseDoc.data();

          this.mostRecentCourse = {
            id: courseDoc.id,
            title: courseData['title'] || '',
            category: courseData['category'] || '',
          };
        }

        this.mostRecentLessonData = {
          id: lessonDoc.id,
          courseId: lessonData['courseId'],
          type: lessonData['type'] || '',
          content: lessonData['content'] || '',
          src: lessonData['source'] || '',
          videoSrc: lessonData['video-source'] || '',
          order: lessonData['order'] || 0,
          isComplete: true,
        };
      }
    } catch (error) {
      console.error('Error fetching the most recent course:', error);
    }
  }

  async GetMostRecentQuestions(): Promise<void> {
    try {
      const db = getFirestore();
      this.recentQuestionDetails = [];
      this.sectionCounts = { A: 0, B: 0, C: 0 };

      for (const completedLesson of this.recentQuestions) {
        const questionRef = doc(db, 'exam-questions', completedLesson.lessonId);
        const questionDoc = await getDoc(questionRef);

        if (questionDoc.exists()) {
          const questionData = questionDoc.data();
          const questionDetails: Question = {
            id: questionDoc.id,
            isComplete: questionData['isComplete'] || false,
            title: questionData['question'] || '',
            type: questionData['type'] || '',
            topic: questionData['topic'] || '',
            style: questionData['style'] || '',
            source: questionData['source'] || '',
            section: questionData['section'] || '',
          };

          const completedAt = completedLesson.completedAt;
          this.sectionCounts[questionDetails.section]++;
          this.recentQuestionDetails.push({ ...questionDetails, completedAt });
        }
      }
    } catch (error) {
      console.error('Error fetching recent question details:', error);
    }
  }

  getCompletionPercentage(section: 'A' | 'B' | 'C'): number {
    const completed = this.sectionCounts[section];
    const total = this.totalQuestions[section];
    return (completed / total) * 100;
  }
}

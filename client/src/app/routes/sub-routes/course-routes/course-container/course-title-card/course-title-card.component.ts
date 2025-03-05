import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lesson } from 'src/app/models/lesson';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { CourseContainerService } from 'src/app/shared/services/state/course-container.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import {
  getFirestore,
  doc,
  collection,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore';
import { CourseService } from 'src/app/shared/services/temp/course.service';
import { CompletedLesson } from 'src/app/models/user';

@Component({
  selector: 'app-course-title-card',
  templateUrl: './course-title-card.component.html',
  styleUrls: ['./course-title-card.component.css'],
})
export class CourseTitleCardComponent implements OnInit, OnDestroy {
  lesson$: Observable<Lesson | null>;
  allLessons$: Observable<Lesson[]>;
  title: string = '';
  currentLessonIndex: number = -1;
  hasPrevious: boolean = false;
  hasNext: boolean = false;
  isAuthenticated: boolean = false;
  private subscription!: Subscription;
  private allLessons: Lesson[] = [];
  currentLesson: Lesson | null = null;

  constructor(
    private courseContainerService: CourseContainerService,
    private auth: AuthService,
    private courseService: CourseService
  ) {
    this.lesson$ = this.courseContainerService.lesson$;
    this.allLessons$ = this.courseContainerService.allLessons$;
  }

  ngOnInit() {
    this.subscription = combineLatest([
      this.lesson$,
      this.allLessons$,
    ]).subscribe(([currentLesson, allLessons]) => {
      this.currentLesson = currentLesson;
      this.allLessons = allLessons;
      this.title = currentLesson?.content ?? '';
      this.currentLessonIndex = allLessons.findIndex(
        (lesson) => lesson.id === currentLesson?.id
      );
      this.hasPrevious = this.currentLessonIndex > 0;
      this.hasNext = this.currentLessonIndex < allLessons.length - 1;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleCompletion(lesson: Lesson | null) {
    if (lesson) {
      if (lesson.isComplete === true) {
        this.markAsNotComplete(lesson.id);
      } else {
        this.markAsComplete(lesson.id);
      }
      lesson.isComplete = !lesson.isComplete;

      if (lesson.courseId) {
        this.courseService.getCourse(lesson.courseId).subscribe((course) => {
          if (course) {
            this.courseService.updateCourseProgress(course);
            console.log('c data', course);
          }
        });
      }
    } else {
      console.warn('Lesson is null, cannot toggle completion');
    }
  }

  async markAsComplete(lessonId: string) {
    const user = this.auth.getCurrentUser();
    if (!user) {
      console.error('User not found');
      return;
    }
    try {
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const userDocRef = doc(usersCollection, user.id);

      const completedLesson: CompletedLesson = {
        lessonId: lessonId,
        completedAt: Date.now(),
        type: 'lesson',
      };

      await updateDoc(userDocRef, {
        completedLessons: arrayUnion(completedLesson),
      });

      const updatedUser = {
        ...user,
        completedLessons: [...user.completedLessons, completedLesson],
      };
      this.auth.setCurrentUser(updatedUser);

      const updatedLesson = this.allLessons.find(
        (lesson) => lesson.id === lessonId
      );
      if (updatedLesson) updatedLesson.isComplete = true;
    } catch (error) {
      console.error('Error marking lesson as complete:', error);
    }
  }

  async markAsNotComplete(lessonId: string) {
    const user = this.auth.getCurrentUser();
    if (!user) {
      console.error('User not found');
      return;
    }

    try {
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const userDocRef = doc(usersCollection, user.id);

      const lessonToRemove = user.completedLessons.find(
        (lesson) => lesson.lessonId === lessonId
      );
      if (!lessonToRemove) return;

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

      const updatedLesson = this.allLessons.find(
        (lesson) => lesson.id === lessonId
      );
      if (updatedLesson) updatedLesson.isComplete = false;
    } catch (error) {
      console.error('Error marking lesson as not complete:', error);
    }
  }

  navigateToPreviousLesson() {
    if (this.hasPrevious) {
      const previousLesson = this.allLessons[this.currentLessonIndex - 1];
      this.courseContainerService.navigateToLesson(previousLesson.id);
    }
  }

  navigateToNextLesson() {
    if (this.hasNext) {
      const nextLesson = this.allLessons[this.currentLessonIndex + 1];
      this.courseContainerService.navigateToLesson(nextLesson.id);
    }
  }
}

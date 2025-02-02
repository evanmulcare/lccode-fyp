import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lesson } from 'src/app/models/lesson';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { CourseContainerService } from 'src/app/shared/services/state/course-container.service';
import { UserService } from 'src/app/shared/services/temp/user.service';

@Component({
  selector: 'app-course-title-card',
  templateUrl: './course-title-card.component.html',
  styleUrls: ['./course-title-card.component.css'],
})
export class CourseTitleCardComponent implements OnInit, OnDestroy {
  lesson$: Observable<Lesson | null>;
  allLessons$: Observable<Lesson[]>;
  isCompleted: boolean = false;
  title: string = '';
  currentLessonIndex: number = -1;
  hasPrevious: boolean = false;
  hasNext: boolean = false;
  isAuthenticated: boolean = false;
  private subscription!: Subscription;
  private allLessons: Lesson[] = [];

  constructor(
    private courseContainerService: CourseContainerService,
    private userService: UserService
  ) {
    this.lesson$ = this.courseContainerService.lesson$;
    this.allLessons$ = this.courseContainerService.allLessons$;
  }

  ngOnInit() {
    this.subscription = combineLatest([
      this.lesson$,
      this.allLessons$,
    ]).subscribe(([currentLesson, allLessons]) => {
      this.allLessons = allLessons;
      if (this.isAuthenticated) {
        this.isCompleted = currentLesson
          ? this.userService.getCompletedLessons().includes(currentLesson.id)
          : false;
      } else {
        this.isCompleted = false;
      }
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

  toggleCompletion() {
    this.isCompleted = !this.isCompleted;
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

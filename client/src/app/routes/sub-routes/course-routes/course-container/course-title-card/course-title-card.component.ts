import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lesson } from 'src/app/models/lesson';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { CourseContainerService } from 'src/app/shared/services/state/course-container.service';
import { CourseService } from 'src/app/shared/services/firebase/course.service';
import { QuestionService } from 'src/app/shared/services/firebase/question.service';

@Component({
  selector: 'app-course-title-card',
  templateUrl: './course-title-card.component.html',
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
    private courseService: CourseService,
    private questionService: QuestionService
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
    const completed = await this.questionService.markAsComplete(
      lessonId,
      'lesson'
    );

    if (completed) {
      const updatedLesson = this.allLessons.find(
        (lesson) => lesson.id === lessonId
      );
      if (updatedLesson) updatedLesson.isComplete = true;
    }
  }

  async markAsNotComplete(lessonId: string) {
    const success = await this.questionService.markAsNotComplete(lessonId);

    if (success) {
      const updatedLesson = this.allLessons.find(
        (lesson) => lesson.id === lessonId
      );
      if (updatedLesson) updatedLesson.isComplete = false;
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

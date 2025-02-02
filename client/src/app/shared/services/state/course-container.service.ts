import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../temp/course.service';
import { Course } from 'src/app/models/course';
import { Section } from 'src/app/models/section';
import { Lesson } from 'src/app/models/lesson';

@Injectable({
  providedIn: 'root',
})
export class CourseContainerService {
  private courseSubject = new BehaviorSubject<Course | null>(null);
  private sectionsSubject = new BehaviorSubject<Section[]>([]);
  private selectedSectionIdSubject = new BehaviorSubject<string | null>(null);
  private lessonSubject = new BehaviorSubject<Lesson | null>(null);
  private lessonTypeSubject = new BehaviorSubject<string | null>(null);
  private isSidebarOpenSubject = new BehaviorSubject<boolean>(true);
  private allLessonsSubject = new BehaviorSubject<Lesson[]>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  get course$(): Observable<Course | null> {
    return this.courseSubject.asObservable();
  }

  get sections$(): Observable<Section[]> {
    return this.sectionsSubject.asObservable();
  }

  get selectedSectionId$(): Observable<string | null> {
    return this.selectedSectionIdSubject.asObservable();
  }

  get lesson$(): Observable<Lesson | null> {
    return this.lessonSubject.asObservable();
  }

  get lessonType$(): Observable<string | null> {
    return this.lessonTypeSubject.asObservable();
  }

  get isSidebarOpen$(): Observable<boolean> {
    return this.isSidebarOpenSubject.asObservable();
  }
  get allLessons$(): Observable<Lesson[]> {
    return this.allLessonsSubject.asObservable();
  }
  initializeCourse(courseId: string, lessonId: string | null) {
    this.courseService
      .getCourse(courseId)
      .pipe(
        switchMap((courseData) => {
          this.courseSubject.next(courseData);
          this.sectionsSubject.next(courseData?.sections || []);
          return this.courseService.getAllLessons(courseId);
        }),
        tap((lessons) => {
          this.allLessonsSubject.next(lessons);
          if (lessonId) {
            const currentLesson = lessons.find(
              (lesson) => lesson.id === lessonId
            );
            if (currentLesson) {
              this.updateCurrentLesson(currentLesson);
            }
          }
        })
      )
      .subscribe();
  }

  loadLesson(courseId: string, lessonId: string) {
    this.courseService
      .getLesson(courseId, lessonId)
      .pipe(
        tap((lessonData) => {
          this.updateCurrentLesson(lessonData);
        }),
        switchMap((lessonData) =>
          this.courseService.getSectionByLesson(courseId, lessonId)
        ),
        tap((sectionData) => {
          this.selectedSectionIdSubject.next(sectionData?.id || null);
        })
      )
      .subscribe();
  }

  private updateCurrentLesson(lesson: Lesson | null) {
    this.lessonSubject.next(lesson);
    this.lessonTypeSubject.next(lesson?.type as string | null);
  }

  toggleSidebar() {
    this.isSidebarOpenSubject.next(!this.isSidebarOpenSubject.value);
  }

  navigateToLesson(lessonId: string) {
    const courseId = this.courseSubject.value?.id;
    if (courseId) {
      this.router.navigate([`/courses/${courseId}/${lessonId}`]);
      this.loadLesson(courseId, lessonId);
    }
  }
}

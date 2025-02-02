import { Component } from '@angular/core';
import {
  faCode,
  faFont,
  faChevronDown,
  faChevronRight,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { CourseContainerService } from 'src/app/shared/services/state/course-container.service';
import { UserService } from 'src/app/shared/services/temp/user.service';
import { CourseService } from 'src/app/shared/services/temp/course.service';

@Component({
  selector: 'app-course-sidenav',
  templateUrl: './course-sidenav.component.html',
  styleUrls: ['./course-sidenav.component.css'],
})
export class CourseSidenavComponent {
  sectionsWithLessons: any[] = [];
  selectedSectionId: string | null = null;
  selectedLessonId: string | undefined;
  isAuthenticated: boolean = false;
  icons = {
    faCode,
    faFont,
    faPen,
    faChevronDown,
    faChevronRight,
  };
  expandedSections: Set<string> = new Set<string>();

  constructor(
    private courseContainerService: CourseContainerService,
    private courseService: CourseService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.courseContainerService.course$.subscribe((course) => {
      if (course) {
        this.loadSectionLessons(course.id);
      }
    });

    this.courseContainerService.selectedSectionId$.subscribe((sectionId) => {
      this.selectedSectionId = sectionId;
      if (sectionId) {
        this.expandedSections.add(sectionId);
      }
    });

    this.courseContainerService.lesson$.subscribe((lesson) => {
      this.selectedLessonId = lesson?.id;

      if (lesson) {
        const sectionWithLesson = this.sectionsWithLessons.find((section) =>
          section.lessons.some(
            (lessonItem: { id: string }) => lessonItem.id === lesson.id
          )
        );

        if (sectionWithLesson) {
          this.selectedSectionId = sectionWithLesson.id;
          this.expandedSections.add(sectionWithLesson.id);
        }
      }
    });
  }

  private loadSectionLessons(courseId: string) {
    this.courseContainerService.sections$
      .pipe(map((sections) => sections || []))
      .subscribe((sections) => {
        const sectionObservables: Observable<any>[] = sections.map((section) =>
          this.courseService.getLessonsForSection(courseId, section.id).pipe(
            map((lessons) => ({
              id: section.id,
              title: section.title,
              lessons: lessons.map((lesson: any) => ({
                ...lesson,
                isComplete: this.userService
                  .getCompletedLessons()
                  .includes(lesson.id),
              })),
            }))
          )
        );

        forkJoin(sectionObservables).subscribe((sectionsWithLessons) => {
          this.sectionsWithLessons = sectionsWithLessons;
        });
      });
  }

  toggleSection(sectionId: string) {
    if (this.expandedSections.has(sectionId)) {
      this.expandedSections.delete(sectionId);
    } else {
      this.expandedSections.add(sectionId);
    }
  }

  selectLesson(lessonId: string) {
    this.selectedLessonId = lessonId;
    this.courseContainerService.navigateToLesson(lessonId);
  }

  isSectionHighlighted(section: any): boolean {
    return (
      this.expandedSections.has(section.id) &&
      section.lessons.some((lesson: any) => lesson.id === this.selectedLessonId)
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faChevronLeft,
  faLink,
  faDownload,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { forkJoin } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Lesson } from 'src/app/models/lesson';
import { Section } from 'src/app/models/section';
import { CourseService } from 'src/app/shared/services/firebase/course.service';

@Component({
  selector: 'app-course-single-view',
  templateUrl: './course-single-view.component.html',
})
export class CourseSingleViewComponent implements OnInit {
  icons = {
    faChevronLeft,
    faLink,
    faDownload,
    faPlay,
  };

  course: Course | null = null;
  sections: Section[] = [];
  lessons: Lesson[] = [];
  prerequisiteCourses: { id: string; title: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  async ngOnInit() {
    const courseId = this.route.snapshot.params['courseId'];
    this.course = await this.courseService.loadCourseById(courseId);
    await this.courseService.loadLessons();

    if (this.course) {
      this.sections = this.course.sections;
      this.loadLessonsForSections(courseId, this.course.sections);

      this.courseService
        .getPrerequisiteCourses(courseId)
        .subscribe((prerequisites) => {
          this.prerequisiteCourses = prerequisites;
        });
    }
  }

  private loadLessonsForSections(courseId: string, sections: Section[]): void {
    const sectionIds = sections.map((section) => section.id);
    const lessonObservables = sectionIds.map((sectionId) =>
      this.courseService.getLessonsForSection(courseId, sectionId)
    );

    forkJoin(lessonObservables).subscribe((results) => {
      this.lessons = results.flat();
    });
  }

  getLessonsForSection(sectionId: string): Lesson[] {
    return this.lessons.filter((lesson) =>
      this.course?.sections
        .find((section) => section.id === sectionId)
        ?.lessons.includes(lesson.id)
    );
  }

  refreshPage(route: string[]): void {
    this.router.navigate(route, { replaceUrl: true }).then(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(route);
      });
    });
  }

  shareContent() {
    alert('sharing not implemented yet!');
  }
  downloadMaterial() {
    alert('Download not implemented yet!');
  }
}

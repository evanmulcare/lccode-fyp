import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseContainerService } from 'src/app/shared/services/state/course-container.service';

@Component({
  selector: 'app-course-container',
  templateUrl: './course-container.component.html',
  styleUrls: ['./course-container.component.css'],
})
export class CourseContainerComponent {
  course$ = this.courseContainerService.course$;
  sections$ = this.courseContainerService.sections$;
  lesson$ = this.courseContainerService.lesson$;
  lessonType$ = this.courseContainerService.lessonType$;
  isSidebarOpen$ = this.courseContainerService.isSidebarOpen$;

  constructor(
    private courseContainerService: CourseContainerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.params['courseId'];
    const lessonId = this.route.snapshot.params['lessonId'];
    this.courseContainerService.initializeCourse(courseId, lessonId);
  }
  onLessonSelected(lessonId: string) {
    this.courseContainerService.navigateToLesson(lessonId);
  }
}

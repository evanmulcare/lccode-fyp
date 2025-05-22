import { Component } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/shared/services/firebase/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
})
export class CoursesComponent {
  courses: Course[] = [];
  constructor(private courseService: CourseService) {}

  async ngOnInit() {
    await this.courseService.loadCourses();
    await this.courseService.loadLessons();
    this.courses = this.courseService.courses;
  }
}

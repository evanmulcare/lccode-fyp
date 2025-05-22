import { Component, Input } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
})
export class CourseCardComponent {
  @Input() course?: Course;
  faPlay = faPlay;
}

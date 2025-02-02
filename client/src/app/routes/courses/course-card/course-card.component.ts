import { Component, Input } from '@angular/core';
import { faPlay, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent {
  @Input() course?: Course;
  faPlay = faPlay;
  faDownload = faDownload;

  onDownload() {
    alert('Download not implemented yet.');
  }
}

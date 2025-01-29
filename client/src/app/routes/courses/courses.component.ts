import { Component } from '@angular/core';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  card: Course = {
    id: '1',
    title: 'Introduction Course',
    description: 'This is a course for testing and introduction to platform',
    category: '1',
    locked: false,
    strand: 'Testing',
    resourcesSrc: '',
    prerequisites: [],
    sections: [],
  };
}

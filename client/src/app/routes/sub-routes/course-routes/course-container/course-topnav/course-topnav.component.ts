import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { CourseContainerService } from 'src/app/shared/services/state/course-container.service';
import { faHouse, faBars } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-course-topnav',
  templateUrl: './course-topnav.component.html',
  styleUrls: ['./course-topnav.component.css'],
})
export class CourseTopnavComponent {
  isSidebarOpen$: Observable<boolean>;
  course$: Observable<Course | null>;
  progressPercentage: number = 0;
  isAuthenticated: boolean = false;
  icons = {
    faHouse,
    faBars,
  };

  constructor(private courseContainerService: CourseContainerService) {
    this.isSidebarOpen$ = this.courseContainerService.isSidebarOpen$;
    this.course$ = this.courseContainerService.course$;
  }

  ngOnInit() {
    this.course$.subscribe((course) => {
      if (course) {
        this.progressPercentage = course.progress;
      }
    });
  }

  toggleSidebar() {
    this.courseContainerService.toggleSidebar();
  }
}

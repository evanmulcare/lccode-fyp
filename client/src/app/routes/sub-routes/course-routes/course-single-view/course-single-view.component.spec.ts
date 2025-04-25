import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseSingleViewComponent } from './course-single-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CourseService } from 'src/app/shared/services/firebase/course.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

class ActivatedRouteStub {
  snapshot = {
    params: { courseId: '1' },
  };
}

describe('CourseSingleViewComponent', () => {
  let component: CourseSingleViewComponent;
  let fixture: ComponentFixture<CourseSingleViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseSingleViewComponent],
      imports: [FontAwesomeModule],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        {
          provide: CourseService,
          useValue: {
            loadCourseById: () =>
              of({ id: '1', title: 'Test Course', sections: [] }),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(CourseSingleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

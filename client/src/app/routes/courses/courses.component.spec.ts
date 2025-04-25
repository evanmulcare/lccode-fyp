import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { CourseService } from 'src/app/shared/services/firebase/course.service';
import { Course } from 'src/app/models/course';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-course-card',
  template: '<div>{{ course?.title }}</div>',
})
class MockCourseCardComponent {
  @Input() course!: Course;
}

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let mockCourseService: jasmine.SpyObj<CourseService>;

  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'Introduction',
      category: 'Testing',
      locked: false,
      description: 'This is a course for testing and introduction to platform',
      strand: 'Testing',
      resourcesSrc: '',
      sections: [],
      prerequisites: [],
      progress: 0,
    },
  ];

  beforeEach(waitForAsync(() => {
    mockCourseService = jasmine.createSpyObj('CourseService', [
      'loadCourses',
      'loadLessons',
    ]);
    mockCourseService.loadCourses.and.returnValue(Promise.resolve());
    mockCourseService.loadLessons.and.returnValue(Promise.resolve());
    mockCourseService.courses = mockCourses;

    TestBed.configureTestingModule({
      declarations: [CoursesComponent, MockCourseCardComponent],
      providers: [{ provide: CourseService, useValue: mockCourseService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load courses and lessons on init and assign courses', async () => {
    await component.ngOnInit();
    expect(mockCourseService.loadCourses).toHaveBeenCalled();
    expect(mockCourseService.loadLessons).toHaveBeenCalled();
    expect(component.courses).toEqual(mockCourses);
  });

  it('should render the correct number of course cards', async () => {
    await component.ngOnInit();
    fixture.detectChanges();
    const courseCards =
      fixture.nativeElement.querySelectorAll('app-course-card');
    expect(courseCards.length).toBe(mockCourses.length);
  });
});

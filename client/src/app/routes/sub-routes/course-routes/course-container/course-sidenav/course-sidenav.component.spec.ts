import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseSidenavComponent } from './course-sidenav.component';
import { CourseContainerService } from 'src/app/shared/services/state/course-container.service';
import { CourseService } from 'src/app/shared/services/firebase/course.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const activatedRouteMock = {
  snapshot: {
    params: {
      courseId: '123',
    },
  },
};

describe('CourseSidenavComponent', () => {
  let component: CourseSidenavComponent;
  let fixture: ComponentFixture<CourseSidenavComponent>;

  const courseContainerServiceMock = {
    course$: of({ id: 'course1' }), 
    selectedSectionId$: of('section1'),
    lesson$: of({ id: 'lesson1' }), 
    sections$: of([
      { id: 'section1', title: 'Section 1', lessons: [] },
    ]),
  };

  const courseServiceMock = {
    getLessonsForSection: (courseId: string, sectionId: string) =>
      of([
        { id: 'lesson1', content: 'Lesson 1 content', type: 'note', src: '' },
      ]),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [CourseSidenavComponent],
      providers: [
        {
          provide: CourseContainerService,
          useValue: courseContainerServiceMock,
        },
        { provide: CourseService, useValue: courseServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    });

    fixture = TestBed.createComponent(CourseSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

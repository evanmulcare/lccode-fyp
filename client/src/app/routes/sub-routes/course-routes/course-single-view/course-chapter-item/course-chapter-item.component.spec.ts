import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CourseChapterItemComponent } from './course-chapter-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('CourseChapterItemComponent', () => {
  let component: CourseChapterItemComponent;
  let fixture: ComponentFixture<CourseChapterItemComponent>;

  const mockSection = {
    id: 'section1',
    title: 'Introduction to Angular',
    lessons: ['MockLesson'],
  };

  const activatedRouteMock = {
    snapshot: {
      params: {
        courseId: '123',
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [CourseChapterItemComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteMock }],
    });

    fixture = TestBed.createComponent(CourseChapterItemComponent);
    component = fixture.componentInstance;
    component.section = mockSection;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

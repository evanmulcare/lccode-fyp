import { TestBed } from '@angular/core/testing';
import { CourseService } from './course.service';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CourseService,
        {
          provide: AuthService,
          useValue: {
            getCurrentUser: () => ({
              completedLessons: [],
            }),
          },
        },
      ],
    });

    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

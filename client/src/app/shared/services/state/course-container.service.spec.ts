import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CourseContainerService } from './course-container.service';
import { of } from 'rxjs';

describe('CourseContainerService', () => {
  let service: CourseContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseContainerService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'course1' } },
            params: of({}),
          },
        },
      ],
    });

    service = TestBed.inject(CourseContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

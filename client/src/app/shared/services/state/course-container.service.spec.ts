import { TestBed } from '@angular/core/testing';

import { CourseContainerService } from './course-container.service';

describe('CourseContainerService', () => {
  let service: CourseContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

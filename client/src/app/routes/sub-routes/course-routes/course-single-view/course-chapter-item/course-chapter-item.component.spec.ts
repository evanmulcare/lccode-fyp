import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseChapterItemComponent } from './course-chapter-item.component';

describe('CourseChapterItemComponent', () => {
  let component: CourseChapterItemComponent;
  let fixture: ComponentFixture<CourseChapterItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseChapterItemComponent]
    });
    fixture = TestBed.createComponent(CourseChapterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

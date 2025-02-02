import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTopnavComponent } from './course-topnav.component';

describe('CourseTopnavComponent', () => {
  let component: CourseTopnavComponent;
  let fixture: ComponentFixture<CourseTopnavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseTopnavComponent]
    });
    fixture = TestBed.createComponent(CourseTopnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

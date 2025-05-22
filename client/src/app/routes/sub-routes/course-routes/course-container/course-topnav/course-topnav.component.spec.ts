import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseTopnavComponent } from './course-topnav.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseContainerService } from 'src/app/shared/services/state/course-container.service';

class ActivatedRouteStub {
  params = of({ courseId: '123' });
}

class MockCourseContainerService {
  course$ = of({ progress: 75 }); 
  isSidebarOpen$ = of(false); 
  toggleSidebar = jasmine.createSpy('toggleSidebar'); 
}

describe('CourseTopnavComponent', () => {
  let component: CourseTopnavComponent;
  let fixture: ComponentFixture<CourseTopnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseTopnavComponent],
      imports: [FontAwesomeModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        {
          provide: CourseContainerService,
          useClass: MockCourseContainerService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseTopnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.progressPercentage).toBe(75); 
  });
});

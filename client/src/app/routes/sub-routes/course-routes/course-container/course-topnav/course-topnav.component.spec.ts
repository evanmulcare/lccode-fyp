import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseTopnavComponent } from './course-topnav.component';
import { CourseContainerService } from 'src/app/shared/services/state/course-container.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';  
import { RouterTestingModule } from '@angular/router/testing';  

class ActivatedRouteStub {
  params = of({ courseId: '123' });
}

describe('CourseTopnavComponent', () => {
  let component: CourseTopnavComponent;
  let fixture: ComponentFixture<CourseTopnavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseTopnavComponent],
      imports: [
        FontAwesomeModule, 
        RouterTestingModule, 
      ],
      providers: [
        CourseContainerService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseTopnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

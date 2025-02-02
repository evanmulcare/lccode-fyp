import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTitleCardComponent } from './course-title-card.component';

describe('CourseTitleCardComponent', () => {
  let component: CourseTitleCardComponent;
  let fixture: ComponentFixture<CourseTitleCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseTitleCardComponent]
    });
    fixture = TestBed.createComponent(CourseTitleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

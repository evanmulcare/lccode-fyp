import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSingleViewComponent } from './course-single-view.component';

describe('CourseSingleViewComponent', () => {
  let component: CourseSingleViewComponent;
  let fixture: ComponentFixture<CourseSingleViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseSingleViewComponent]
    });
    fixture = TestBed.createComponent(CourseSingleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

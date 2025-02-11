import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamMaterialViewComponent } from './exam-material-view.component';

describe('ExamMaterialViewComponent', () => {
  let component: ExamMaterialViewComponent;
  let fixture: ComponentFixture<ExamMaterialViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamMaterialViewComponent]
    });
    fixture = TestBed.createComponent(ExamMaterialViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamMaterialCardComponent } from './exam-material-card.component';

describe('ExamMaterialCardComponent', () => {
  let component: ExamMaterialCardComponent;
  let fixture: ComponentFixture<ExamMaterialCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamMaterialCardComponent]
    });
    fixture = TestBed.createComponent(ExamMaterialCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

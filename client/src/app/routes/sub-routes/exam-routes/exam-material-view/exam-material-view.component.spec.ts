import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExamMaterialViewComponent } from './exam-material-view.component';
import { ExamMaterialCardComponent } from 'src/app/routes/practice/exam-material-card/exam-material-card.component';
import { CommonModule } from '@angular/common';
import { ExamCardComponent } from '../exam-single-view/exam-card/exam-card.component';

describe('ExamMaterialViewComponent', () => {
  let component: ExamMaterialViewComponent;
  let fixture: ComponentFixture<ExamMaterialViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExamMaterialViewComponent,
        ExamMaterialCardComponent,
        ExamCardComponent,
      ],
      imports: [CommonModule, FontAwesomeModule],
    });
    fixture = TestBed.createComponent(ExamMaterialViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

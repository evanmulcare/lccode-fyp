import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExamMaterialViewComponent } from '../../sub-routes/exam-routes/exam-material-view/exam-material-view.component';
import { ExamMaterialCardComponent } from '../exam-material-card/exam-material-card.component'; 

describe('ExamMaterialViewComponent', () => {
  let component: ExamMaterialViewComponent;
  let fixture: ComponentFixture<ExamMaterialViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamMaterialViewComponent, ExamMaterialCardComponent] 
    });

    fixture = TestBed.createComponent(ExamMaterialViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

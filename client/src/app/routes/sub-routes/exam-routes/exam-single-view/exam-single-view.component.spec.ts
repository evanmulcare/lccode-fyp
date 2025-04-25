import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExamSingleViewComponent } from './exam-single-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VideoPlayerComponent } from 'src/app/shared/ui/video-player/video-player.component';
import { ExamCardComponent } from './exam-card/exam-card.component';
import { MarkdownModule } from 'ngx-markdown';
import { SafePipe } from 'src/app/shared/pipes/safe.pipe';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('ExamSingleViewComponent', () => {
  let component: ExamSingleViewComponent;
  let fixture: ComponentFixture<ExamSingleViewComponent>;
  const markdownModule = MarkdownModule.forRoot();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExamSingleViewComponent,
        VideoPlayerComponent,
        ExamCardComponent,
        SafePipe,
      ],
      imports: [
        FontAwesomeModule,
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient }),
      ],
      providers: [...(markdownModule.providers ?? [])],
    });
    fixture = TestBed.createComponent(ExamSingleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

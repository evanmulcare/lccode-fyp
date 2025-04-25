import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodePracticeSingleViewComponent } from './code-practice-single-view.component';
import { ActivatedRoute } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MarkdownViewerComponent } from 'src/app/shared/ui/markdown-viewer/markdown-viewer.component';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('CodePracticeSingleViewComponent', () => {
  let component: CodePracticeSingleViewComponent;
  let fixture: ComponentFixture<CodePracticeSingleViewComponent>;
  const markdownModule = MarkdownModule.forRoot();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodePracticeSingleViewComponent, MarkdownViewerComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        FontAwesomeModule,
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient }),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: new Map([['question', '1']]) },
          },
        },
        ...(markdownModule.providers ?? []),
      ],
    });

    fixture = TestBed.createComponent(CodePracticeSingleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesViewerComponent } from './notes-viewer.component';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('NotesViewerComponent', () => {
  let component: NotesViewerComponent;
  let fixture: ComponentFixture<NotesViewerComponent>;
  const markdownModule = MarkdownModule.forRoot();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesViewerComponent],
      imports: [
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient }),
      ],
      providers: [...(markdownModule.providers ?? [])],
    });
    fixture = TestBed.createComponent(NotesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

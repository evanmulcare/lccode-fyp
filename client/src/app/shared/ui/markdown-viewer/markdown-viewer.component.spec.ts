import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownViewerComponent } from './markdown-viewer.component';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';

describe('MarkdownViewerComponent', () => {
  let component: MarkdownViewerComponent;
  let fixture: ComponentFixture<MarkdownViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkdownViewerComponent],
      imports: [MarkdownModule],
      providers: [MarkdownService],
    });
    fixture = TestBed.createComponent(MarkdownViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

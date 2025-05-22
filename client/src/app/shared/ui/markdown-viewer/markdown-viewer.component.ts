import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-markdown-viewer',
  templateUrl: './markdown-viewer.component.html',
})
export class MarkdownViewerComponent {
  @Input() source: string | undefined;
}

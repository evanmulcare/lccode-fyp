import { Component, Input } from '@angular/core';
import { Lesson } from 'src/app/models/lesson';

@Component({
  selector: 'app-notes-viewer',
  templateUrl: './notes-viewer.component.html',
})
export class NotesViewerComponent {
  @Input() lesson: Lesson | null = null;
}

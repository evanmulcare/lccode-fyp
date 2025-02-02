import { Component, Input } from '@angular/core';
import { Lesson } from 'src/app/models/lesson';

@Component({
  selector: 'app-exam-question-viewer',
  templateUrl: './exam-question-viewer.component.html',
  styleUrls: ['./exam-question-viewer.component.css'],
})
export class ExamQuestionViewerComponent {
  @Input() lesson: Lesson | null = null;
}

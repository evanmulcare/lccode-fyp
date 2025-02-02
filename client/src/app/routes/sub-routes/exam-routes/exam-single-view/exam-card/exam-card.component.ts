import { Component, Input, OnInit } from '@angular/core';
import { faDownload, faPlay } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-exam-card',
  templateUrl: './exam-card.component.html',
  styleUrls: ['./exam-card.component.css'],
})
export class ExamCardComponent {
  @Input() image: string | '' | undefined;
  icons = {
    faDownload,
    faPlay,
  };
}

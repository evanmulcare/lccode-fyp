import { Component } from '@angular/core';
import {
  faChevronLeft,
  faDownload,
  faLink,
  faPlay,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exam-single-view',
  templateUrl: './exam-single-view.component.html',
  styleUrls: ['./exam-single-view.component.css'],
})
export class ExamSingleViewComponent {
  icons = {
    faChevronLeft,
    faDownload,
    faLink,
    faPlay,
    faLock,
  };
}

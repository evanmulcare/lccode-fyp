import { Component } from '@angular/core';
import { faChevronLeft, faDownload } from '@fortawesome/free-solid-svg-icons';
import { EXAM_MATERIAL_LINKS } from 'src/app/models/exam-materials';

@Component({
  selector: 'app-exam-material-view',
  templateUrl: './exam-material-view.component.html',
})
export class ExamMaterialViewComponent {
  EXAM_MATERIAL_LINKS = EXAM_MATERIAL_LINKS;
  icons = {
    faChevronLeft,
    faDownload,
  };
}

import { Component } from '@angular/core';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { EXAM_MATERIAL_LINKS } from 'src/app/models/exam-materials';
@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
})
export class PracticeComponent {
  EXAM_MATERIAL_LINKS = EXAM_MATERIAL_LINKS;
  icons = {
    faDownload,
  };
}

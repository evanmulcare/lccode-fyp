import { Component, Input } from '@angular/core';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exam-material-card',
  templateUrl: './exam-material-card.component.html',
})
export class ExamMaterialCardComponent {
  @Input() year!: string;
  @Input() image1!: string;
  @Input() image2!: string;
  @Input() downloadLink!: string;
  icons = { faDownload };

  downloadMaterial() {
    window.open(this.downloadLink, '_blank');
  }
}

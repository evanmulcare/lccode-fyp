import { Component } from '@angular/core';
import {
  faDownload,
  faLock,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-worksheet-tab',
  templateUrl: './worksheet-tab.component.html',
  styleUrls: ['./worksheet-tab.component.css'],
})
export class WorksheetTabComponent {
  icons = {
    faDownload,
    faLock,
    faChevronLeft,
  };
  worksheets = [
    {
      title: 'Variables- Computational Thinking',
      source: '/assets/worksheets/variables.pdf',
    },
    {
      title: 'Strings - Computational Thinking',
      source: '/assets/worksheets/strings.pdf',
    },
  ];

  selectedPdfUrl: string | null = null;

  createWorksheet() {
    alert('Create not implemented');
  }
  previewWorksheet() {
    alert('Preview not implemented');
  }

  downloadWorksheet() {
    alert('Downlad not implemented');
  }

  completeWorksheet() {
    alert('Completing not implemented');
  }
}

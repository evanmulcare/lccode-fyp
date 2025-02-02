import { Component } from '@angular/core';
import { faDownload, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exam-papers-tab',
  templateUrl: './exam-papers-tab.component.html',
  styleUrls: ['./exam-papers-tab.component.css'],
})
export class ExamPapersTabComponent {
  papers = [
    {
      year: '2024',
      source: 'assets/exams/2024.zip',
    },
    {
      year: '2023',
    },
    {
      year: '2022',
    },
    {
      year: '2021',
    },
    {
      year: '2020',
    },
    {
      year: '2019',
    },
    {
      year: '2018',
    },
  ];
  icons = {
    faDownload,
    faLock,
  };

  downloadExamMaterial() {
    alert('Download not implemented yet!');
  }
}

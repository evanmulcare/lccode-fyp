import { Component } from '@angular/core';
import {
  faChevronLeft,
  faDownload,
  faLink,
  faPlus,
  faSearch,
  faTimes,
  faChevronDown,
  faList,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { PDFDocument } from 'pdf-lib';

@Component({
  selector: 'app-exam-worksheet-builder',
  templateUrl: './exam-worksheet-builder.component.html',
  styleUrls: ['./exam-worksheet-builder.component.css'],
})
export class ExamWorksheetBuilderComponent {
  icons = {
    faChevronLeft,
    faDownload,
    faLink,
    faSearch,
    faTimes,
    faPlus,
    faChevronDown,
    faList,
    faSave,
  };
  ordinaryExams = [
    {
      year: 2024,
      questions: [
        {
          order: 1,
          topic: 'Syntax',
          year: 2024,
          section: 'A',
          format: 'Short Answer',
          description: 'Explain why for loop syntax does not work.',
          content:
            'assets/exams/questions/2024/section_a/q3/2024_a_3_thumbnail.png',
          pdfFormat: 'assets/exams/questions/2024/section_a/q3/2024_a_3.pdf',
        },
      ],
    },
  ];
  higherExams = [
    {
      year: 2021,
      questions: [
        {
          order: 1,
          topic: 'Variables',
          year: 2024,
          section: 'A',
          format: 'Short Answer',
          description: 'Fill in variable values.',
          content:
            'assets/exams/questions/2024/section_a/q1/2024_a_1_thumbnail.png',
          pdfFormat: 'assets/exams/questions/2024/section_a/q1/2024_a_1.pdf',
        },
      ],
    },
    {
      year: 2023,
      questions: [
        {
          order: 1,
          topic: 'Variables',
          year: 2024,
          section: 'A',
          format: 'Short Answer',
          description: 'Fill in variable values.',
          content:
            'assets/exams/questions/2024/section_a/q1/2024_a_1_thumbnail.png',
          pdfFormat: 'assets/exams/questions/2024/section_a/q1/2024_a_1.pdf',
        },
        {
          order: 3,
          topic: 'Syntax',
          year: 2024,
          section: 'A',
          format: 'Short Answer',
          description: 'Explain why for loop syntax does not work.',
          content:
            'assets/exams/questions/2024/section_a/q3/2024_a_3_thumbnail.png',
          pdfFormat: 'assets/exams/questions/2024/section_a/q3/2024_a_3.pdf',
        },
      ],
    },
  ];
  worksheetTitle: string = '';
  pages: any[] = [];

  isExamQuestionsOpen = false;
  isMarkingSchemesOpen = false;

  exams = this.higherExams;
  menuOpen = false;
  currentSelection = 'Higher';

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  chooseOption(option: string) {
    this.currentSelection = option;
    this.exams = option === 'Higher' ? this.higherExams : this.ordinaryExams;
    this.menuOpen = false;
  }

  addEmptyPage() {
    const page = {
      id: this.generateId(),
      type: 'empty',
      content: 'assets/exams/questions/page_templates/blank_page_thumbnail.png',
      pdfFormat: 'assets/exams/questions/page_templates/blank_page.pdf',
    };
    this.pages.push(page);
  }

  addLinedPage() {
    const page = {
      id: this.generateId(),
      type: 'lined',
      content: 'assets/exams/questions/page_templates/lined_page_thumbnail.png',
      pdfFormat: 'assets/exams/questions/page_templates/lined_page.pdf',
    };
    this.pages.push(page);
  }

  addAnswerPage(question: any) {
    const page = {
      id: this.generateId(),
      type: 'answer',
      content: question.content,
      pdfFormat: question.pdfFormat,
    };
    this.pages.push(page);
  }

  removePage(index: number) {
    this.pages.splice(index, 1);
  }

  generateId() {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async downloadPDF() {
    const mergedPdf = await PDFDocument.create();

    for (const page of this.pages) {
      const pdfBytes = await fetch(page.pdfFormat).then((res) =>
        res.arrayBuffer()
      );
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((copiedPage) => mergedPdf.addPage(copiedPage));
    }

    const mergedPdfFile = await mergedPdf.save();
    const blob = new Blob([mergedPdfFile], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${this.worksheetTitle || 'Worksheet'}.pdf`;
    link.click();
  }
}

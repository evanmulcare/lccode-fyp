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
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { ExamData } from 'src/app/models/examData';

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

  ordinaryExams: ExamData[] = [
    {
      year: 2024,
      questions: [],
    },
  ];

  higherExams: ExamData[] = [
    {
      year: 2024,
      questions: [],
    },
  ];

  worksheetTitle: string = '';
  pages: any[] = [];

  includeMarkingScheme: boolean = false;

  exams = this.higherExams;
  menuOpen = false;
  currentSelection = 'higher';
  currentYear = 2024;

  ngOnInit(): void {
    this.loadExamQuestions();
  }

  async loadExamQuestions() {
    try {
      const db = getFirestore();
      const examQuestionsCollection = collection(db, 'exam-questions');
      const examQuery = query(
        examQuestionsCollection,
        where('year', '==', this.currentYear),
        where('level', '==', this.currentSelection),
        orderBy('order')
      );

      const querySnapshot = await getDocs(examQuery);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('Fetched exam question:', data);

        const examData = {
          year: data['year'],
          questions: [
            {
              order: data['order'],
              topic: data['topic'],
              year: data['year'],
              section: data['section'],
              description: data['description'],
              'IMG-URL': data['IMG-URL'],
              'PDF-URL': data['PDF-URL'],
              'MARKING-IMG-URL': data['MARKING-IMG-URL'],
              'MARKING-PDF-URL': data['MARKING-PDF-URL'],
            },
          ],
        };

        const existingExamIndex = this.higherExams.findIndex(
          (exam) => exam.year === data['year']
        );
        if (existingExamIndex !== -1) {
          this.higherExams[existingExamIndex].questions.push(
            examData.questions[0]
          );
        } else {
          this.higherExams.push(examData);
        }
      });
    } catch (error) {
      console.error('Error loading exam questions:', error);
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  chooseOption(option: string) {
    this.currentSelection = option;
    this.exams = option === 'higher' ? this.higherExams : this.ordinaryExams;
    this.menuOpen = false;
  }

  addEmptyPage() {
    const page = {
      id: this.generateId(),
      type: 'empty',
      IMG_URL: 'assets/exams/questions/page_templates/blank_page_thumbnail.png',
      PDF_URL: 'assets/exams/questions/page_templates/blank_page.pdf',
    };
    this.pages.push(page);
  }

  addLinedPage() {
    const page = {
      id: this.generateId(),
      type: 'lined',
      IMG_URL: 'assets/exams/questions/page_templates/lined_page_thumbnail.png',
      PDF_URL: 'assets/exams/questions/page_templates/lined_page.pdf',
    };
    this.pages.push(page);
  }

  addAnswerPage(question: any) {
    const page = {
      id: this.generateId(),
      type: 'answer',
      year: question.year,
      section: question.section,
      order: question.order,
      IMG_URL: question['IMG-URL'],
      PDF_URL: question['PDF-URL'],
      MARKING_IMG_URL: question['MARKING-IMG-URL'],
      MARKING_PDF_URL: question['MARKING-PDF-URL'],
    };
    this.pages.push(page);
  }

  removePage(index: number) {
    const removedPage = this.pages[index];
    this.pages.splice(index, 1);

    if (removedPage.type === 'answer') {
      this.pages = this.pages.filter(
        (page) =>
          !(
            page.type === 'markingScheme' &&
            page.year === removedPage.year &&
            page.section === removedPage.section &&
            page.order === removedPage.order
          )
      );
    }
  }

  toggleMarkingSchemes() {
    if (this.includeMarkingScheme) {
      this.addAllMarkingSchemes();
    } else {
      this.removeAllMarkingSchemes();
    }
  }

  addAllMarkingSchemes() {
    const addedQuestions = this.pages.filter((page) => page.type === 'answer');
    addedQuestions.forEach((page) => {
      console.log('querst', page);
      const marking = {
        id: this.generateId(),
        type: 'markingScheme',
        year: page.year,
        section: page.section,
        order: page.order,
        IMG_URL: page.MARKING_IMG_URL,
        PDF_URL: page.MARKING_PDF_URL,
      };
      this.pages.push(marking);
    });
  }

  removeAllMarkingSchemes() {
    this.pages = this.pages.filter((page) => page.type !== 'markingScheme');
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
      try {
        const pdfBytes = await fetch(page.PDF_URL)
          .then((res) => res.arrayBuffer())
          .catch((error) => {
            console.error('Error fetching PDF:', error);
            throw error;
          });

        const pdf = await PDFDocument.load(pdfBytes);

        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((copiedPage) => mergedPdf.addPage(copiedPage));
      } catch (error) {
        console.error('Error processing page PDF:', error);
      }
    }

    const mergedPdfFile = await mergedPdf.save();
    const blob = new Blob([mergedPdfFile], { type: 'application/pdf' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${this.worksheetTitle || 'Worksheet'}.pdf`;
    link.click();
  }
}

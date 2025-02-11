import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { ExamQuestion } from 'src/app/models/exam-question';

@Component({
  selector: 'app-practice-single-view',
  templateUrl: './practice-single-view.component.html',
  styleUrls: ['./practice-single-view.component.css'],
})
export class PracticeSingleViewComponent {
  icons = {
    faChevronLeft,
    faTimes,
  };
  isFlipped = false;
  questionData: ExamQuestion | null = null;
  constructor(private route: ActivatedRoute) {}
  isOverlayVisible = false;

  // Toggle the overlay visibility
  toggleOverlay() {
    this.isOverlayVisible = !this.isOverlayVisible;
  }

  // Close the overlay
  closeOverlay() {
    this.isOverlayVisible = false;
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  ngOnInit() {
    this.loadExamQuestion();
  }

  async loadExamQuestion() {
    try {
      const questionId = this.route.snapshot.paramMap.get('question');

      if (questionId) {
        const db = getFirestore();
        const docRef = doc(db, 'exam-questions', questionId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          this.questionData = {
            id: docSnap.id,
            question: data['question'] || 'No question available',
            order: data['order'],
            topic: data['topic'],
            year: data['year'],
            section: data['section'],
            description: data['description'],
            isComplete: data['isComplete'] || false,
            style: data['style'] || 'Default',
            type: data['type'] || 'Default',
            level: data['level'] || 'N/A',
            'IMG-URL': data['IMG-URL'],
            'PDF-URL': data['PDF-URL'],
            'MARKING-IMG-URL': data['MARKING-IMG-URL'],
            'MARKING-PDF-URL': data['MARKING-PDF-URL'],
          };
        } else {
          console.log('No such document!');
        }
      }
    } catch (error) {
      console.error('Error loading exam question:', error);
    }
  }
}

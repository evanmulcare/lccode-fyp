import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEye, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-worksheet-question-card',
  templateUrl: './worksheet-question-card.component.html',
  styleUrls: ['./worksheet-question-card.component.css'],
})
export class WorksheetQuestionCardComponent {
  @Input() question: any;
  @Output() addAnswer = new EventEmitter<any>();
  showThumbnail: boolean = false;
  icons = {
    faPlus,
    faEye,
  };

  onAdd() {
    this.addAnswer.emit(this.question);
  }
  togglePreview() {
    console.log('test', this.question);

    this.showThumbnail = !this.showThumbnail;
  }
}

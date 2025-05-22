import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-worksheet-question-list',
  templateUrl: './worksheet-question-list.component.html',
})
export class WorksheetQuestionListComponent {
  @Input() exam: any;
  @Input() questions: any[] = [];
  @Output() addAnswer = new EventEmitter<any>();

  icons = {
    faChevronDown,
  };
  isOpen = false;

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  onAdd(question: any): void {
    this.addAnswer.emit(question);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent {
  selectedOption: string = 'papers';

  selectOption(option: string): void {
    this.selectedOption = option;
  }
}

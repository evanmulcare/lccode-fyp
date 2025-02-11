import { Component } from '@angular/core';

@Component({
  selector: 'app-question-card-front',
  template: `<div class="question-card-front">
    <ng-content></ng-content>
  </div>`,
  styleUrls: ['./question-card.component.css'],
})
export class QuestionCardFront {}

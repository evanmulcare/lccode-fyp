import { Component } from '@angular/core';

@Component({
  selector: 'app-question-card-back',
  template: `<div class="question-card-back">
    <ng-content></ng-content>
  </div>`,
  styleUrls: ['./question-card.component.css'],
})
export class QuestionCardBack {}

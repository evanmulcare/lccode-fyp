import { Injectable } from '@angular/core';
import { Question } from 'src/app/models/question';
@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private questions: Question[] = [
    {
      id: 'q1',
      isComplete: false,
      title: 'Hello, World!',
      type: 'code',
      style: 'code',
      topic: 'Easy',
      source: '/assets/markdown/questions/hello-world.md',
    },
    {
      id: 'q2',
      isComplete: false,
      title: 'Print Your Name',
      type: 'code',
      style: 'code',

      topic: 'Easy',
      source: '/assets/markdown/questions/print-name.md',
    },
    {
      id: 'q3',
      isComplete: false,
      title: 'Print the Result of 2 Raised to the Power of 3',
      type: 'code',
      style: 'code',

      topic: 'Easy',
      source: '/assets/markdown/questions/power-numbers.md',
    },
    {
      id: 'q4',
      isComplete: false,
      title: 'Print the Sum of Two Numbers',
      type: 'code',
      style: 'code',

      topic: 'Easy',
      source: '/assets/markdown/questions/sum-numbers.md',
    },
    {
      id: 'q5',
      isComplete: false,
      title: 'Concatenate Two Strings',
      type: 'code',
      style: 'code',

      topic: 'Easy',
      source: '/assets/markdown/questions/concat-strings.md',
    },
  ];

  constructor() {}

  getQuestions(): Question[] {
    return this.questions;
  }
}

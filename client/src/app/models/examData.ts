import { ExamQuestion } from './exam-question';

export interface ExamData {
  year: number;
  questions: ExamQuestion[];
}

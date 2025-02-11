export interface ExamQuestion {
  id: string;
  question: string;
  order: number;
  topic: string;
  year: number;
  section: string;
  description: string;
  isComplete: boolean;
  style: string;
  type: string;
  level: string;
  'IMG-URL': string;
  'PDF-URL': string;
  'MARKING-IMG-URL': string;
  'MARKING-PDF-URL': string;
}

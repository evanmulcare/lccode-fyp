import { TestCase } from './lesson';

export interface CodeQuestion {
  id: string;
  question: string;
  topic: string;
  description: string;
  isComplete: boolean;
  style: string;
  type: string;
  source: string;
  placeholder?: string;
  testcases?: TestCase[];
  basecodesource?: string;
}

export interface TestCase {
  input: string;
  expected_output: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  type: string;
  content: string;
  src: string;
  videoSrc: string;
  order: number;
  isComplete: boolean;
  placeholder?: string;
  testcases?: TestCase[];
}

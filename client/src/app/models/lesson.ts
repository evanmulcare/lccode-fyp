export interface Lesson {
  id: string;
  courseId: string;
  type: string;
  content: string;
  src: string;
  videoSrc: string;
  order: number;
  isComplete: boolean;
}

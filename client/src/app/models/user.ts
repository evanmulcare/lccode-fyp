export interface CompletedLesson {
  lessonId: string;
  completedAt: number;
  type: 'lesson' | 'question';
}

export interface User {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  completedLessons: CompletedLesson[];
}

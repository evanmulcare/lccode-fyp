import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Lesson } from 'src/app/models/lesson';
import { Course } from 'src/app/models/course';
import { Section } from 'src/app/models/section';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses: Course[] = [
    {
      id: '1',
      title: 'Introduction Course',
      description: 'This is a course for testing and introduction to platform',
      category: '1',
      locked: false,
      strand: 'Testing',
      resourcesSrc:
        '../../../../assets/markdown/resources/introduction_course_resources.md',
      prerequisites: ['2', '6'],
      sections: [
        {
          id: '1',
          title: 'Overview',
          lessons: ['1'],
        },
        {
          id: '2',
          title: 'Goals',
          lessons: ['2'],
        },
        {
          id: '3',
          title: 'Layout',
          lessons: ['3'],
        },
        {
          id: '4',
          title: 'Documentation',
          lessons: ['4'],
        },
        {
          id: '5',
          title: 'Feedback',
          lessons: ['5'],
        },
        {
          id: '6',
          title: 'Examples',
          lessons: ['6', '7', '8'],
        },
      ],
    },
  ];

  private lessons: Lesson[] = [
    {
      id: '1',
      courseId: '1',
      type: 'note',
      videoSrc: '',
      src: '../../../../assets/markdown/introduction/background.md',
      content: 'Background - Why LCCode',
    },
    {
      id: '2',
      courseId: '1',
      type: 'note',
      videoSrc: '',
      src: '../../../../assets/markdown/introduction/features.md',
      content: 'Features and Requirements',
    },
    {
      id: '3',
      courseId: '1',
      type: 'note',
      videoSrc: '',
      src: '../../../../assets/markdown/introduction/sections.md',
      content: 'Sections',
    },
    {
      id: '4',
      courseId: '1',
      type: 'note',
      videoSrc: '',
      src: '../../../../assets/markdown/introduction/docs.md',
      content: 'Accessing Docs',
    },
    {
      id: '5',
      courseId: '1',
      type: 'note',
      videoSrc: '',
      src: '../../../../assets/markdown/introduction/contact.md',
      content: 'contact information',
    },
    {
      id: '6',
      courseId: '1',
      type: 'note',
      videoSrc:
        'https://player.vimeo.com/video/694118427?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
      src: '../../../../assets/markdown/introduction/note-example.md',
      content: 'Note Example',
    },
    {
      id: '7',
      courseId: '1',
      type: 'code',
      videoSrc: '',
      src: '../../../../assets/markdown/introduction/code-example.md',
      content: 'Coding Example',
    },
    {
      id: '8',
      courseId: '1',
      type: 'exam',
      videoSrc: '',
      src: '',
      content: 'Exam Example',
    },
  ];

  constructor() {}

  getCourse(courseId: string): Observable<Course | null> {
    const course = this.courses.find((c) => c.id === courseId) || null;
    return of(course);
  }

  getPrerequisiteCourses(
    courseId: string
  ): Observable<{ id: string; title: string }[]> {
    const course = this.courses.find((c) => c.id === courseId);
    if (!course || !course.prerequisites || course.prerequisites.length === 0) {
      return of([]);
    }

    const prerequisiteCourses = course.prerequisites
      .map((prerequisiteId) => {
        const prerequisiteCourse = this.courses.find(
          (c) => c.id === prerequisiteId
        );
        return prerequisiteCourse
          ? { id: prerequisiteCourse.id, title: prerequisiteCourse.title }
          : null;
      })
      .filter((prerequisite) => prerequisite !== null) as {
      id: string;
      title: string;
    }[];

    return of(prerequisiteCourses);
  }

  getLesson(courseId: string, lessonId: string): Observable<Lesson | null> {
    const lesson =
      this.lessons.find((l) => l.courseId === courseId && l.id === lessonId) ||
      null;
    return of(lesson);
  }

  getLessonsForSection(
    courseId: string,
    sectionId: string
  ): Observable<Lesson[]> {
    const course = this.courses.find((c) => c.id === courseId);
    if (!course) return of([]);

    const section = course.sections.find((s) => s.id === sectionId);
    if (!section) return of([]);

    const lessons = this.lessons.filter(
      (lesson) =>
        lesson.courseId === courseId && section.lessons.includes(lesson.id)
    );

    return of(lessons);
  }

  getSectionByLesson(
    courseId: string,
    lessonId: string
  ): Observable<Section | null> {
    const course = this.courses.find((c) => c.id === courseId);
    if (!course) return of(null);

    const section =
      course.sections.find((s) => s.lessons.includes(lessonId)) || null;
    return of(section);
  }

  getCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  getAllLessons(courseId: string): Observable<Lesson[]> {
    const course = this.courses.find((c) => c.id === courseId);
    if (!course) return of([]);

    const lessonIds = course.sections.flatMap((section) => section.lessons);
    const lessons = this.lessons.filter((lesson) =>
      lessonIds.includes(lesson.id)
    );

    return of(lessons);
  }

  isCourseValid(courseId: string): Observable<boolean> {
    const course = this.courses.find((c) => c.id === courseId);
    if (!course || course.locked) {
      return of(false);
    }
    return of(true);
  }

  isLessonValid(courseId: string, lessonId: string): Observable<boolean> {
    const course = this.courses.find((c) => c.id === courseId);
    if (!course || course.locked) {
      return of(false);
    }

    const lessonExists = this.lessons.some(
      (l) => l.courseId === courseId && l.id === lessonId
    );
    return of(lessonExists);
  }
}

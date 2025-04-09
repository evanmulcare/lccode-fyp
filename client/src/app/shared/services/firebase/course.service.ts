import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Lesson } from 'src/app/models/lesson';
import { Course } from 'src/app/models/course';
import { Section } from 'src/app/models/section';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from 'firebase/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courses: Course[] = [];
  lessons: Lesson[] = [];

  constructor(private auth: AuthService) {}

  async loadCourses(): Promise<void> {
    try {
      const db = getFirestore();
      const coursesCollection = collection(db, 'courses');
      const querySnapshot = await getDocs(coursesCollection);

      this.courses = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data['title'] || '',
          description: data['description'] || '',
          category: data['category'] || '',
          locked: data['locked'] || false,
          strand: data['strand'] || '',
          resourcesSrc: data['resourcesSrc'] || '',
          prerequisites: data['prerequisites'] || [],
          sections: data['sections'] || [],
          progress: 0,
        } as Course;
      });
    } catch (error: any) {
      console.error('Error loading courses:', error);
    }
  }

  async loadCourseById(courseId: string): Promise<Course | null> {
    try {
      const db = getFirestore();
      const courseRef = doc(db, 'courses', courseId);
      const courseDoc = await getDoc(courseRef);

      if (courseDoc.exists()) {
        const data = courseDoc.data();
        const course: Course = {
          id: courseDoc.id,
          title: data['title'] || '',
          description: data['description'] || '',
          category: data['category'] || '',
          locked: data['locked'] || false,
          strand: data['strand'] || '',
          resourcesSrc: data['resourcesSrc'] || '',
          prerequisites: data['prerequisites'] || [],
          sections: data['sections'] || [],
          progress: 0,
        };
        return course;
      } else {
        console.log('No such course found!');
        return null;
      }
    } catch (error: any) {
      console.error('Error loading course:', error);
      return null;
    }
  }

  async loadLessons(): Promise<void> {
    try {
      const db = getFirestore();
      const lessonsCollection = collection(db, 'lessons');
      const querySnapshot = await getDocs(lessonsCollection);

      this.lessons = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        const lesson: Lesson = {
          id: doc.id,
          courseId: data['courseId'] || '',
          type: data['type'] || 'note',
          videoSrc: data['video-source'] || '',
          src: data['source'] || '',
          content: data['content'] || '',
          order: data['order'],
          isComplete: false,
        };

        if (data['placeholder']) {
          lesson.placeholder = data['placeholder'];
        }

        if (data['testcases'] && Array.isArray(data['testcases'])) {
          lesson.testcases = data['testcases'].map((testCase: any) => ({
            input: testCase.input || '',
            expected_output: testCase.expected_output || '',
          }));
        }

        return lesson;
      });

      const user = this.auth.getCurrentUser();
      this.lessons.forEach((lesson) => {
        if (
          user?.completedLessons.some(
            (completed) => completed.lessonId === lesson.id
          )
        ) {
          lesson.isComplete = true;
        }
      });

      this.courses.forEach((course) => {
        this.updateCourseProgress(course);
      });
      console.log('new progress', this.courses);
    } catch (error: any) {
      console.error('Error loading lessons:', error);
    }
  }

  updateCourseProgress(course: Course): void {
    const allLessons = this.lessons.filter(
      (lesson) => lesson.courseId === course.id
    );
    const completedLessons = allLessons.filter(
      (lesson) => lesson.isComplete
    ).length;
    course.progress = (completedLessons / allLessons.length) * 100;
  }

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

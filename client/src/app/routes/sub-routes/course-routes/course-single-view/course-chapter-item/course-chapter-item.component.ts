import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from 'src/app/models/lesson';
import { Section } from 'src/app/models/section';
import {
  faCode,
  faFont,
  faQuestion,
  faChevronDown,
  faLink,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-chapter-item',
  templateUrl: './course-chapter-item.component.html',
})
export class CourseChapterItemComponent implements OnInit {
  icons = {
    faCode,
    faLink,
    faFont,
    faChevronDown,
    faQuestion,
  };

  @Input() section!: Section;
  @Input() lessons: Lesson[] = [];
  courseID!: String;
  isOpen = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.courseID = this.route.snapshot.params['courseId'];
  }

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  getLessonTitle(lessonId: string): string {
    const lesson = this.lessons.find((lesson) => lesson.id === lessonId);

    return lesson ? lesson.content : 'Unknown Lesson';
  }

  getLessonIcon(lessonId: string): any {
    const lesson = this.lessons.find((lesson) => lesson.id === lessonId);
    if (lesson?.type === 'code') return this.icons.faCode;
    if (lesson?.type === 'note') return this.icons.faFont;
    return this.icons.faQuestion;
  }

  getLessonLink(lessonId: string): string {
    const lesson = this.lessons.find((lesson) => lesson.id === lessonId);
    return lesson ? lesson.src : '#';
  }
}

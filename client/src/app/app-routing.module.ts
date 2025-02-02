import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { ExamComponent } from './routes/exam/exam.component';
import { CoursesComponent } from './routes/courses/courses.component';
import { CourseSingleViewComponent } from './routes/sub-routes/course-routes/course-single-view/course-single-view.component';
import { CourseContainerComponent } from './routes/sub-routes/course-routes/course-container/course-container.component';
import { ExamSingleViewComponent } from './routes/sub-routes/exam-routes/exam-single-view/exam-single-view.component';
import { ExamWorksheetBuilderComponent } from './routes/sub-routes/exam-routes/exam-worksheet-builder/exam-worksheet-builder.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'exam', component: ExamComponent },
  {
    path: 'exam/papers/:year',
    component: ExamSingleViewComponent,
  },
  {
    path: 'worksheets/new',
    component: ExamWorksheetBuilderComponent,
  },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/:courseId', component: CourseSingleViewComponent },
  {
    path: 'courses/:courseId/:lessonId',
    component: CourseContainerComponent,
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

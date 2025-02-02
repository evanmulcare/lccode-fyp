import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { ExamComponent } from './routes/exam/exam.component';
import { CoursesComponent } from './routes/courses/courses.component';
import { CourseSingleViewComponent } from './routes/sub-routes/course-routes/course-single-view/course-single-view.component';
import { CourseContainerComponent } from './routes/sub-routes/course-routes/course-container/course-container.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'exam', component: ExamComponent },
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

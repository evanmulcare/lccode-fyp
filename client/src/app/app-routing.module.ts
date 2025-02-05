import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { ExamComponent } from './routes/exam/exam.component';
import { CoursesComponent } from './routes/courses/courses.component';
import { CourseSingleViewComponent } from './routes/sub-routes/course-routes/course-single-view/course-single-view.component';
import { CourseContainerComponent } from './routes/sub-routes/course-routes/course-container/course-container.component';
import { ExamSingleViewComponent } from './routes/sub-routes/exam-routes/exam-single-view/exam-single-view.component';
import { ExamWorksheetBuilderComponent } from './routes/sub-routes/exam-routes/exam-worksheet-builder/exam-worksheet-builder.component';
import { LoginComponent } from './routes/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'exam', component: ExamComponent, canActivate: [AuthGuard] },
  {
    path: 'exam/papers/:year',
    component: ExamSingleViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'worksheets/new',
    component: ExamWorksheetBuilderComponent,
    canActivate: [AuthGuard],
  },
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
  {
    path: 'courses/:courseId',
    component: CourseSingleViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courses/:courseId/:lessonId',
    component: CourseContainerComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

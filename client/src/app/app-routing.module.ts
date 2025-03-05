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
import { PracticeComponent } from './routes/practice/practice.component';
import { PracticeSingleViewComponent } from './routes/sub-routes/exam-routes/practice-single-view/practice-single-view.component';
import { ExamMaterialViewComponent } from './routes/sub-routes/exam-routes/exam-material-view/exam-material-view.component';
import { ProgressComponent } from './routes/progress/progress.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'exam', component: ExamComponent, canActivate: [AuthGuard] },
  {
    path: 'exam/papers/:year',
    component: ExamSingleViewComponent,
    canActivate: [AuthGuard],
  },
  { path: 'practice', component: PracticeComponent, canActivate: [AuthGuard] },
  {
    path: 'material',
    component: ExamMaterialViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'practice/questions/:question',
    component: PracticeSingleViewComponent,
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
  { path: 'progress', component: ProgressComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

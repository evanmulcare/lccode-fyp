import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { ExamComponent } from './routes/exam/exam.component';
import { CoursesComponent } from './routes/courses/courses.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'exam', component: ExamComponent },
  { path: 'courses', component: CoursesComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

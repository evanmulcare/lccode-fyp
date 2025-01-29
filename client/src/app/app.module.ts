import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { ExamComponent } from './routes/exam/exam.component';
import { ExamPapersTabComponent } from './routes/exam/exam-tabs/exam-papers-tab/exam-papers-tab.component';
import { OverviewTabComponent } from './routes/exam/exam-tabs/overview-tab/overview-tab.component';
import { WorksheetTabComponent } from './routes/exam/exam-tabs/worksheet-tab/worksheet-tab.component';
import { CoursesComponent } from './routes/courses/courses.component';
import { CourseCardComponent } from './routes/courses/course-card/course-card.component';
import { NavbarComponent } from './shared/ui/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExamComponent,
    ExamPapersTabComponent,
    OverviewTabComponent,
    WorksheetTabComponent,
    CoursesComponent,
    CourseCardComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

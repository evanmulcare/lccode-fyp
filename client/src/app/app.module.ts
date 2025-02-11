import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MarkdownModule } from 'ngx-markdown';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'environments/environment';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { ExamComponent } from './routes/exam/exam.component';
import { ExamPapersTabComponent } from './routes/exam/exam-tabs/exam-papers-tab/exam-papers-tab.component';
import { OverviewTabComponent } from './routes/exam/exam-tabs/overview-tab/overview-tab.component';
import { WorksheetTabComponent } from './routes/exam/exam-tabs/worksheet-tab/worksheet-tab.component';
import { CoursesComponent } from './routes/courses/courses.component';
import { CourseCardComponent } from './routes/courses/course-card/course-card.component';
import { NavbarComponent } from './shared/ui/navbar/navbar.component';
import { CourseSingleViewComponent } from './routes/sub-routes/course-routes/course-single-view/course-single-view.component';
import { CourseChapterItemComponent } from './routes/sub-routes/course-routes/course-single-view/course-chapter-item/course-chapter-item.component';
import { MarkdownViewerComponent } from './shared/ui/markdown-viewer/markdown-viewer.component';
import { CourseContainerComponent } from './routes/sub-routes/course-routes/course-container/course-container.component';
import { CourseSidenavComponent } from './routes/sub-routes/course-routes/course-container/course-sidenav/course-sidenav.component';
import { CourseTitleCardComponent } from './routes/sub-routes/course-routes/course-container/course-title-card/course-title-card.component';
import { CourseTopnavComponent } from './routes/sub-routes/course-routes/course-container/course-topnav/course-topnav.component';
import { NotesViewerComponent } from './shared/ui/notes-viewer/notes-viewer.component';
import { ExamQuestionViewerComponent } from './shared/ui/exam-question-viewer/exam-question-viewer.component';
import { CodeEditorComponent } from './shared/ui/code-editor/code-editor.component';
import { FormsModule } from '@angular/forms';
import { VideoPlayerComponent } from './shared/ui/video-player/video-player.component';
import { SafePipe } from './shared/pipes/safe.pipe';
import { ExamSingleViewComponent } from './routes/sub-routes/exam-routes/exam-single-view/exam-single-view.component';
import { ExamCardComponent } from './routes/sub-routes/exam-routes/exam-single-view/exam-card/exam-card.component';
import { ExamWorksheetBuilderComponent } from './routes/sub-routes/exam-routes/exam-worksheet-builder/exam-worksheet-builder.component';
import { WorksheetQuestionCardComponent } from './routes/sub-routes/exam-routes/exam-worksheet-builder/worksheet-question-card/worksheet-question-card.component';
import { AngularSplitModule } from 'angular-split';
import { WorksheetQuestionListComponent } from './routes/sub-routes/exam-routes/exam-worksheet-builder/worksheet-question-list/worksheet-question-list.component';
import { LoginComponent } from './routes/login/login.component';
import { PracticeComponent } from './routes/practice/practice.component';
import { ExamMaterialCardComponent } from './routes/practice/exam-material-card/exam-material-card.component';
import { PracticeTableComponent } from './routes/practice/practice-table/practice-table.component';
import { PracticeSingleViewComponent } from './routes/sub-routes/exam-routes/practice-single-view/practice-single-view.component';
import { QuestionCardComponent } from './routes/sub-routes/exam-routes/practice-single-view/question-card/question-card.component';
import { ExamMaterialViewComponent } from './routes/sub-routes/exam-routes/exam-material-view/exam-material-view.component';

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
    CourseSingleViewComponent,
    CourseChapterItemComponent,
    MarkdownViewerComponent,
    CourseContainerComponent,
    CourseSidenavComponent,
    CourseTitleCardComponent,
    CourseTopnavComponent,
    NotesViewerComponent,
    ExamQuestionViewerComponent,
    CodeEditorComponent,
    VideoPlayerComponent,
    SafePipe,
    ExamSingleViewComponent,
    ExamCardComponent,
    ExamWorksheetBuilderComponent,
    WorksheetQuestionCardComponent,
    WorksheetQuestionListComponent,
    LoginComponent,
    PracticeComponent,
    ExamMaterialCardComponent,
    PracticeTableComponent,
    PracticeSingleViewComponent,
    QuestionCardComponent,
    ExamMaterialViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    MarkdownModule.forRoot({ loader: HttpClient }),
    MonacoEditorModule.forRoot(),
    AngularSplitModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

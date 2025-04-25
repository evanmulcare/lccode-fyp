import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PracticeComponent } from './practice.component';
import { ExamMaterialCardComponent } from './exam-material-card/exam-material-card.component';
import { PracticeTableComponent } from './practice-table/practice-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';
import { ExamCardComponent } from '../sub-routes/exam-routes/exam-single-view/exam-card/exam-card.component';
import { FormsModule } from '@angular/forms';

// Mock the Firebase options
const angularFireOptionsMock = {
  apiKey: 'fake-api-key',
  authDomain: 'fake-auth-domain',
  databaseURL: 'fake-database-url',
  projectId: 'fake-project-id',
  storageBucket: 'fake-storage-bucket',
  messagingSenderId: 'fake-sender-id',
  appId: 'fake-app-id',
};

describe('PracticeComponent', () => {
  let component: PracticeComponent;
  let fixture: ComponentFixture<PracticeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PracticeComponent,
        ExamMaterialCardComponent,
        PracticeTableComponent,
        ExamCardComponent,
      ],
      imports: [FontAwesomeModule, FormsModule],
      providers: [
        {
          provide: 'angularfire2.app.options',
          useValue: angularFireOptionsMock,
        },
        {
          provide: AuthService,
          useValue: {
            currentUser$: of(null),
          },
        },
        {
          provide: AngularFireAuth,
          useValue: {},
        },
      ],
    });

    fixture = TestBed.createComponent(PracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

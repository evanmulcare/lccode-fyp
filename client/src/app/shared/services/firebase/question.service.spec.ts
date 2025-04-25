import { TestBed } from '@angular/core/testing';
import { QuestionService } from './question.service';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

// Mocked Firebase Configuration
const mockFirebaseConfig = {
  apiKey: 'fake-api-key',
  authDomain: 'fake-auth-domain',
  databaseURL: 'fake-database-url',
  projectId: 'fake-project-id',
  storageBucket: 'fake-storage-bucket',
  messagingSenderId: 'fake-sender-id',
  appId: 'fake-app-id',
  measurementId: 'fake-measurement-id',
};

class MockAngularFireAuth {
  // Mock the required methods of AngularFireAuth
  authState = of(null); // Mock authState observable
}

describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuestionService,
        AuthService,
        { provide: AngularFireAuth, useClass: MockAngularFireAuth },
      ],
    });
    service = TestBed.inject(QuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

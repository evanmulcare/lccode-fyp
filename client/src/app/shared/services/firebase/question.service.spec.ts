import { TestBed } from '@angular/core/testing';
import { QuestionService } from './question.service';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

class MockAngularFireAuth {
  authState = of(null);
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

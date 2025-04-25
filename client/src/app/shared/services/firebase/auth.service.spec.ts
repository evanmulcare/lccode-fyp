import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

class MockAngularFireAuth {
  signInWithEmailAndPassword() { return {}; }
  signInWithPopup() { return {}; }
  signOut() { return Promise.resolve(); }
  createUserWithEmailAndPassword() { return {}; }
}

class MockRouter {
  navigate() {}
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useClass: MockAngularFireAuth },
        { provide: Router, useClass: MockRouter }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

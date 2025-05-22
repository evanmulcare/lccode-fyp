import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { FormsModule } from '@angular/forms';

class MockAuthService {
  login = jasmine.createSpy('login');
  loginGoogle = jasmine.createSpy('loginGoogle');
  signUp = jasmine.createSpy('signUp').and.returnValue(Promise.resolve());
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [{ provide: AuthService, useClass: MockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

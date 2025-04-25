import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressComponent } from './progress.component';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProgressComponent', () => {
  let component: ProgressComponent;
  let fixture: ComponentFixture<ProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,          
        RouterTestingModule,         
      ],
      declarations: [ProgressComponent],
      providers: [
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
        {
          provide: 'angularfire2.app.options',
          useValue: {},
        },
      ],
    });
    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

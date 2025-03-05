import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  icons = {
    faChevronLeft,
  };

  email: string = '';
  password: string = '';

  isModalOpen: boolean = false;
  firstname: string = '';
  lastname: string = '';
  signUpEmail: string = '';
  signUpPassword: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  login() {
    if (this.email === '') {
      alert('Enter email');
      return;
    }
    if (this.password === '') {
      alert('Enter password');
      return;
    }

    this.auth.login(this.email, this.password);

    this.email = '';
    this.password = '';
  }

  loginWithGoogle() {
    this.auth.loginGoogle();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  signUp() {
    const user = {
      id: '',
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.signUpEmail,
      completedLessons: [],
    };

    this.auth
      .signUp(user, this.signUpPassword)
      .then(() => {
        this.closeModal();
      })
      .catch((err) => {
        alert('Error creating account');
      });
  }
}

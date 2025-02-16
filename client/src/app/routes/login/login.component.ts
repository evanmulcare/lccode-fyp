import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

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
}

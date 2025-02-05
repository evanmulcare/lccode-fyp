import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  login(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('auth', 'true');
        this.router.navigate(['home']);
      },
      (err) => {
        alert('Login Error');
        this.router.navigate(['/login']);
      }
    );
  }

  logout() {
    this.auth.signOut().then(
      () => {
        localStorage.removeItem('auth');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from 'firebase/firestore';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.loadUserFromLocalStorage();
  }

  async login(email: string, password: string) {
    try {
      const credential = await this.auth.signInWithEmailAndPassword(
        email,
        password
      );
      const user = credential.user;
      if (user) {
        const userData = await this.fetchUserFromFirestore(user.uid);
        if (userData) {
          this.setCurrentUser(userData);
          this.router.navigate(['home']);
        } else {
          alert('User not found ');
        }
      }
    } catch (error) {
      alert('Login Error');
    }
  }

  async loginGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await this.auth.signInWithPopup(provider);
      const user = credential.user;

      if (user) {
        let userData = await this.fetchUserFromFirestore(user.uid);

        if (!userData) {
          userData = await this.createUser({
            id: user.uid,
            firstname: user.displayName?.split(' ')[0] || '',
            lastname: user.displayName?.split(' ')[1] || '',
            email: user.email || '',
            completedLessons: [],
          });
        }

        this.setCurrentUser(userData);
        this.router.navigate(['home']);
      }
    } catch (error) {
      alert('Login Error');
    }
  }

  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
    });
  }

  async createUser(user: User) {
    const db = getFirestore();
    const usersCollection = collection(db, 'users');
    const userDocRef = doc(usersCollection, user.id);

    const userData = {
      id: user.id,
      email: user.email || '',
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      completedLessons: [],
    };

    try {
      await setDoc(userDocRef, userData);
      return userData;
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

  async signUp(user: User, password: string) {
    try {
      const credential = await this.auth.createUserWithEmailAndPassword(
        user.email,
        password
      );
      const uid = credential.user?.uid;

      if (uid) {
        const newUser: User = {
          id: uid,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          completedLessons: [],
        };

        await this.createUser(newUser);
        this.setCurrentUser(newUser);
        this.router.navigate(['home']);
      }
    } catch (error) {
      alert('Error creating account');
    }
  }

  async fetchUserFromFirestore(uid: string): Promise<User | null> {
    const db = getFirestore();
    const usersCollection = collection(db, 'users');
    const userQuery = query(usersCollection, where('id', '==', uid));
    const userSnapshot = await getDocs(userQuery);

    return userSnapshot.empty ? null : (userSnapshot.docs[0].data() as User);
  }

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private loadUserFromLocalStorage() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUserSubject.next(JSON.parse(userData));
    }
  }
}

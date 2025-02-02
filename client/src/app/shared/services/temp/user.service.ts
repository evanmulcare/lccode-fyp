import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User = {
    id: 'user123',
    name: 'John Doe',
    completedLessons: ['1', '2'],
  };
  constructor() {}
  getUser(): User {
    return this.user;
  }

  getCompletedLessons(): string[] {
    return this.user.completedLessons;
  }
}

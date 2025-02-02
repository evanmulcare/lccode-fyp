import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private showNavbarSubject = new BehaviorSubject<boolean>(true);
  showNavbar$ = this.showNavbarSubject.asObservable();

  setShowNavbar(show: boolean): void {
    this.showNavbarSubject.next(show);
  }
}

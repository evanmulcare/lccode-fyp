import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavbarService } from './shared/services/state/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showNavbar$ = this.navbarService.showNavbar$;

  constructor(private router: Router, private navbarService: NavbarService) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateMastheadVisibility(event.urlAfterRedirects);
      }
    });
  }

  private updateMastheadVisibility(url: string): void {
    const shouldHideMasthead =
      (url.startsWith('/courses/') && url.split('/').length === 4) ||
      url === '/login' ||
      url === '/worksheets/new' ||
      url.includes('/practice/questions');
    this.navbarService.setShowNavbar(!shouldHideMasthead);
  }
}

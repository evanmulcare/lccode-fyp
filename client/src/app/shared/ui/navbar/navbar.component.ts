import { Component } from '@angular/core';
import {
  faTimes,
  faBook,
  faUsers,
  faPlay,
  faExclamation,
  faRightFromBracket,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/firebase/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  icons = {
    faTimes,
    faBook,
    faPlay,
    faUsers,
    faExclamation,
    faRightFromBracket,
    faChartBar,
  };

  constructor(private auth: AuthService) {}

  logout(): void {
    this.auth.logout();
  }
}

import { Component } from '@angular/core';
import {
  faTimes,
  faBook,
  faUsers,
  faPlay,
  faExclamation,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  icons = {
    faTimes,
    faBook,
    faPlay,
    faUsers,
    faExclamation,
    faRightFromBracket,
  };

  logout(): void {
    alert('authentication not implemented yet');
  }
}

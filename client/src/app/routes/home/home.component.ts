import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  openDocumentation(link: string): void {
    window.open(link, '_blank');
  }
}

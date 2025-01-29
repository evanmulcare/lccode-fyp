import { Component } from '@angular/core';

@Component({
  selector: 'app-overview-tab',
  templateUrl: './overview-tab.component.html',
  styleUrls: ['./overview-tab.component.css'],
})
export class OverviewTabComponent {
  activeTab: string = 'sectionA';
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  progressPercent = 0;
}

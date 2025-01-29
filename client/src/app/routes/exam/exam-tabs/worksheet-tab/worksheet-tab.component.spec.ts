import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetTabComponent } from './worksheet-tab.component';

describe('WorksheetTabComponent', () => {
  let component: WorksheetTabComponent;
  let fixture: ComponentFixture<WorksheetTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorksheetTabComponent]
    });
    fixture = TestBed.createComponent(WorksheetTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

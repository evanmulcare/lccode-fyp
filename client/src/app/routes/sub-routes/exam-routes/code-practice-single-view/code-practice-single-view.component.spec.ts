import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePracticeSingleViewComponent } from './code-practice-single-view.component';

describe('CodePracticeSingleViewComponent', () => {
  let component: CodePracticeSingleViewComponent;
  let fixture: ComponentFixture<CodePracticeSingleViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodePracticeSingleViewComponent]
    });
    fixture = TestBed.createComponent(CodePracticeSingleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSingleViewComponent } from './practice-single-view.component';

describe('PracticeSingleViewComponent', () => {
  let component: PracticeSingleViewComponent;
  let fixture: ComponentFixture<PracticeSingleViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PracticeSingleViewComponent]
    });
    fixture = TestBed.createComponent(PracticeSingleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

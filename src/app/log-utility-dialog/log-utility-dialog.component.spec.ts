import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogUtilityDialogComponent } from './log-utility-dialog.component';

describe('LogUtilityDialogComponent', () => {
  let component: LogUtilityDialogComponent;
  let fixture: ComponentFixture<LogUtilityDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogUtilityDialogComponent]
    });
    fixture = TestBed.createComponent(LogUtilityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

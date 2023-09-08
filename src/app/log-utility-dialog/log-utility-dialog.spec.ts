import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogUtilityDialog } from './log-utility-dialog';

describe('LogUtilityDialog', () => {
  let component: LogUtilityDialog;
  let fixture: ComponentFixture<LogUtilityDialog>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogUtilityDialog],
    });
    fixture = TestBed.createComponent(LogUtilityDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

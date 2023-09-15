import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogUtilityComponent } from './log-utility.component';

describe('LogUtilityComponent', () => {
  let component: LogUtilityComponent;
  let fixture: ComponentFixture<LogUtilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LogUtilityComponent],
    });
    fixture = TestBed.createComponent(LogUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

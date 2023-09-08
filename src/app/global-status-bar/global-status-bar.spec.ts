import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalStatusBar } from './global-status-bar';

describe('GlobalStatusBar', () => {
  let component: GlobalStatusBar;
  let fixture: ComponentFixture<GlobalStatusBar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalStatusBar],
    });
    fixture = TestBed.createComponent(GlobalStatusBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

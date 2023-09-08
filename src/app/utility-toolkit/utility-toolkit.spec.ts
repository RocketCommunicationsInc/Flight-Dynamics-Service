import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityToolkit } from './utility-toolkit';

describe('UtilityToolkit', () => {
  let component: UtilityToolkit;
  let fixture: ComponentFixture<UtilityToolkit>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilityToolkit],
    });
    fixture = TestBed.createComponent(UtilityToolkit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

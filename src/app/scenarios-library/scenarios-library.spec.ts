import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenariosLibrary } from './scenarios-library';

describe('ScenariosLibrary', () => {
  let component: ScenariosLibrary;
  let fixture: ComponentFixture<ScenariosLibrary>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScenariosLibrary],
    });
    fixture = TestBed.createComponent(ScenariosLibrary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

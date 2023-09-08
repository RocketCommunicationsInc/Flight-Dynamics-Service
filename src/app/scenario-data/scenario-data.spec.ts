import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioData } from './scenario-data';

describe('ScenarioData', () => {
  let component: ScenarioData;
  let fixture: ComponentFixture<ScenarioData>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScenarioData],
    });
    fixture = TestBed.createComponent(ScenarioData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

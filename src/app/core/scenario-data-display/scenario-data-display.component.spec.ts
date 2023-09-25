import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioDataDisplayComponent } from './scenario-data-display.component';

describe('ScenarioDataDisplayComponent', () => {
  let component: ScenarioDataDisplayComponent;
  let fixture: ComponentFixture<ScenarioDataDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScenarioDataDisplayComponent],
    });
    fixture = TestBed.createComponent(ScenarioDataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

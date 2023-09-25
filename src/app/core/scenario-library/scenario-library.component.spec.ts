import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioLibraryComponent } from './scenario-library.component';

describe('ScenarioLibraryComponent', () => {
  let component: ScenarioLibraryComponent;
  let fixture: ComponentFixture<ScenarioLibraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScenarioLibraryComponent],
    });
    fixture = TestBed.createComponent(ScenarioLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

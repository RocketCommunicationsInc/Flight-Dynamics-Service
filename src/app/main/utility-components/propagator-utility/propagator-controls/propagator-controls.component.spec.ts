import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropagatorControlsComponent } from './propagator-controls.component';

describe('PropagatorControlsComponent', () => {
  let component: PropagatorControlsComponent;
  let fixture: ComponentFixture<PropagatorControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PropagatorControlsComponent],
    });
    fixture = TestBed.createComponent(PropagatorControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

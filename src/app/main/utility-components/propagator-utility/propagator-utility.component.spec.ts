import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropagatorUtilityComponent } from './propagator-utility.component';

describe('PropagatorUtilComponent', () => {
  let component: PropagatorUtilityComponent;
  let fixture: ComponentFixture<PropagatorUtilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PropagatorUtilityComponent],
    });
    fixture = TestBed.createComponent(PropagatorUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

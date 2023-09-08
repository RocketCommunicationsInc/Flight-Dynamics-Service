import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropagatorDialog } from './propagator-dialog';

describe('PropagatorDialog', () => {
  let component: PropagatorDialog;
  let fixture: ComponentFixture<PropagatorDialog>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropagatorDialog]
    });
    fixture = TestBed.createComponent(PropagatorDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

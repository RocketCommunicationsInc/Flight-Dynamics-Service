import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDataGraphComponent } from './track-data-graph.component';

describe('TrackDataComponent', () => {
  let component: TrackDataGraphComponent;
  let fixture: ComponentFixture<TrackDataGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TrackDataGraphComponent],
    });
    fixture = TestBed.createComponent(TrackDataGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

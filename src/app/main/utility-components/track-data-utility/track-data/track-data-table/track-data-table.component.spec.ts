import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDataTableComponent } from './track-data-table.component';

describe('TrackDataComponent', () => {
  let component: TrackDataTableComponent;
  let fixture: ComponentFixture<TrackDataTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TrackDataTableComponent],
    });
    fixture = TestBed.createComponent(TrackDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

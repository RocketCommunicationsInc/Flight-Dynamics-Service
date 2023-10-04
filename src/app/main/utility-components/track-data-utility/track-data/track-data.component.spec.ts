import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDataComponent } from './track-data.component';

describe('TrackDataComponent', () => {
  let component: TrackDataComponent;
  let fixture: ComponentFixture<TrackDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TrackDataComponent],
    });
    fixture = TestBed.createComponent(TrackDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

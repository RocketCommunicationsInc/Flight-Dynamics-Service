import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackFilesComponent } from './track-files.component';

describe('TrackFilesComponent', () => {
  let component: TrackFilesComponent;
  let fixture: ComponentFixture<TrackFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TrackFilesComponent]
    });
    fixture = TestBed.createComponent(TrackFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

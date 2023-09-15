import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDataUtilityComponent } from './track-data-utility.component';

describe('TrackDataUtilComponent', () => {
  let component: TrackDataUtilityComponent;
  let fixture: ComponentFixture<TrackDataUtilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TrackDataUtilityComponent],
    });
    fixture = TestBed.createComponent(TrackDataUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

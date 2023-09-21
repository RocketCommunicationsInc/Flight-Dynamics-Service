import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { mockScenarios, mockTrackFiles } from '../mock-data/generate-data';
import { Scenario, TrackFile } from '../types/data.types';
// import { Feature } from '../+state/app.model';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  getScenarios() {
    const scenarioSubject = new Subject<Scenario[]>();
        scenarioSubject.next(mockScenarios)
    return scenarioSubject.asObservable();
  }

  getTrackFiles() {
    const trackFileSubject = new Subject<TrackFile[]>();
        trackFileSubject.next(mockTrackFiles)
    return trackFileSubject.asObservable();
  }
}

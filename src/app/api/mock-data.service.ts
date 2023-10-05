import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  generateProcessedTrackFile,
  mockScenarios,
  mockSpaceCrafts,
  mockTrackFiles,
} from '../mock-data/generate-data';
import { Scenario, Spacecraft, TrackFile } from '../types/data.types';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  getScenarios() {
    return new BehaviorSubject<Scenario[]>(mockScenarios).asObservable();
  }

  getSpacecrafts() {
    return new BehaviorSubject<Spacecraft[]>(mockSpaceCrafts).asObservable();
  }

  getTrackFiles() {
    return new BehaviorSubject<TrackFile[]>(mockTrackFiles).asObservable();
  }

  processtrackFile(trackFileId: string) {
    return generateProcessedTrackFile(trackFileId);
  }
}

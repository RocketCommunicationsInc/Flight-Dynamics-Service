import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { mockScenarios, mockTrackFiles } from '../mock-data/generate-data';
import { Scenario, TrackFile } from '../types/data.types';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  getScenarios() {
   return new BehaviorSubject<Scenario[]>(mockScenarios).asObservable();
  }

  getTrackFiles() {
   return new BehaviorSubject<TrackFile[]>(mockTrackFiles).asObservable();
  }
}

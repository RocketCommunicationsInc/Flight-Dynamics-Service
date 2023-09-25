import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import {
  mockScenarios,
  mockTrackFiles,
  spaceCraft,
} from '../mock-data/generate-data'
import { Scenario, Spacecraft, TrackFile } from '../types/data.types'

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  getScenarios() {
    return new BehaviorSubject<Scenario[]>(mockScenarios).asObservable()
  }

  getSpacecrafts() {
    return new BehaviorSubject<Spacecraft[]>(spaceCraft).asObservable()
  }

  getTrackFiles() {
    return new BehaviorSubject<TrackFile[]>(mockTrackFiles).asObservable()
  }
}

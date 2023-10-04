import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface LogData {
  timestamp: Date;
  status: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class LogDataService {
  private _logSubject = new BehaviorSubject<LogData | null>(null);

  public getLog() {
    return this._logSubject.asObservable();
  }

  public addLogData(data: LogData) {
    this._logSubject.next(data);
  }
}

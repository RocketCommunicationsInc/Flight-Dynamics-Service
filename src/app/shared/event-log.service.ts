import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';
import { SpacecraftActions } from '../+state/app.actions';
import { Spacecraft } from '../types/data.types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectCurrentSpacecraft } from '../+state/app.selectors';

export interface LogDataConfig {
  timestamp: Date;
  status: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class LogDataService {
  spacecraft: Spacecraft | undefined | null;
  spacecraft$ = this.store
    .select(selectCurrentSpacecraft)
    .pipe(
      takeUntilDestroyed(),
      filter((val) => val !== null)
    )
    .subscribe((result) => {
      return (this.spacecraft = result);
    });

  constructor(private store: Store) {}

  public addEvent(data: LogDataConfig) {
    this.spacecraft$;
    this.store.dispatch(
      SpacecraftActions.spacecraftModified({
        spacecraftId: this.spacecraft!.id,
        updatedSpacecraft: {
          ...this.spacecraft!,
          eventData: [...this.spacecraft!.eventData, ...[data]],
        },
      })
    );
  }
}

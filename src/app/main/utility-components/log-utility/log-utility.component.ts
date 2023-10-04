import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogData, LogDataService } from 'src/app/shared/log-data.service';
import { filter, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Spacecraft } from 'src/app/types/data.types';
import { selectCurrentSpacecraft } from 'src/app/+state/app.selectors';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'fds-log-utility',
  templateUrl: './log-utility.component.html',
  styleUrls: ['./log-utility.component.css'],
  imports: [AstroComponentsModule, RouterLink, RouterOutlet, CommonModule],
})
export class LogUtilityComponent {
  logData: LogData[] = [];
  spacecraft$: Observable<Spacecraft | null> = this.store.select(
    selectCurrentSpacecraft
  );

  constructor(
    private store: Store,
    private logDataService: LogDataService
  ) {
    this.logDataService
      .getLog()
      .pipe(
        takeUntilDestroyed(),
        filter((val): val is LogData => !!val)
      )
      .subscribe((data: LogData) => this.logData.push(data));
  }
}

import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import type { LogData } from 'src/app/types/data.types';
import { selectCurrentSpacecraft } from 'src/app/+state/app.selectors';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'fds-log-utility',
  templateUrl: './log-utility.component.html',
  styleUrls: ['./log-utility.component.css'],
  imports: [AstroComponentsModule, RouterLink, RouterOutlet, CommonModule],
})
export class LogUtilityComponent {
  logData: LogData[] | undefined = [];
  spacecraft$: Subscription = this.store
    .select(selectCurrentSpacecraft)
    .pipe(takeUntilDestroyed())
    .subscribe((result) => {
      this.logData = result?.eventData;
    });

  constructor(private store: Store) {}
}

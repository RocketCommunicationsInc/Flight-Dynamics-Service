import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { LogData, Spacecraft } from 'src/app/types/data.types';
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
  spacecraft$: Observable<Spacecraft | null | undefined> = this.store.select(
    selectCurrentSpacecraft
  );
  logData: LogData[] | undefined = [];

  spacecraft = this.spacecraft$.subscribe((result) => {
    this.logData = result?.eventData;
  });
  constructor(private store: Store) {}
}

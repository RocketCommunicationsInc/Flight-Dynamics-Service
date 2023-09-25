import { Component } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { AstroComponentsModule } from '@astrouxds/angular';
import { UtilityToolkitComponent } from './utility-toolkit/utility-toolkit.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { InputsOutputsDataDisplayComponent } from './inputs-outputs-data-display/inputs-outputs-data-display.component';
import { AppStore } from '../+state/app.model';
import {
  selectSelectedSpacecraftId,
  selectTrackFiles,
} from '../+state/app.reducer';

@Component({
  selector: 'fds-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    AstroComponentsModule,
    UtilityToolkitComponent,
    InputsOutputsDataDisplayComponent,
  ],
})
export class MainComponent {
  selectedSpacecraftId$ = this.store.select(selectSelectedSpacecraftId);
  trackfiles$ = this.store.select(selectTrackFiles);
  constructor(
    private store: Store,
    private state: State<AppStore>
  ) {
    console.log('state', this.state);
    this.selectedSpacecraftId$.subscribe((res) => console.log(res));
    this.trackfiles$.subscribe((res) => {});
  }
}

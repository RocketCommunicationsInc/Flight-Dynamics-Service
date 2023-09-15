import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSatellites, selectSelectedSatId } from '../store/app.reducer';
import { selectSelectedSatellite } from '../store/app.selectors';
import { AstroComponentsModule } from '@astrouxds/angular';
import { UtilityToolkitComponent } from './utility-toolkit/utility-toolkit.component';
import { CommonModule } from '@angular/common';
import { InputsOutputsComponent } from './inputs-outputs/inputs-outputs.component';
import { OutputDataDisplayComponent } from './output-data-display/output-data-display.component';

@Component({
  selector: 'fds-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [
    CommonModule,
    AstroComponentsModule,
    UtilityToolkitComponent,
    InputsOutputsComponent,
    OutputDataDisplayComponent,
  ],
})
export class MainComponent {
  satellites$ = this.store.select(selectSatellites);
  selectedSatelliteId$ = this.store.select(selectSelectedSatId);
  selectSelectedSatellite$ = this.store.select(selectSelectedSatellite);

  constructor(private store: Store) {
    this.satellites$.subscribe((res) => console.log(res));
    this.selectedSatelliteId$.subscribe((res) => console.log(res));
    this.selectSelectedSatellite$.subscribe((res) => console.log(res));
  }
}

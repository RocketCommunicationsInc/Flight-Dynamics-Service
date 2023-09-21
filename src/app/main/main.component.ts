import { Component } from '@angular/core'
import { Store, State } from '@ngrx/store'
import { selectSatellites, selectSelectedSatId } from '../+store/app.reducer'
import { selectSelectedSatellite } from '../+store/app.selectors'
import { AstroComponentsModule } from '@astrouxds/angular'
import { UtilityToolkitComponent } from './utility-toolkit/utility-toolkit.component'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { InputsOutputsDataDisplayComponent } from './inputs-outputs-data-display/inputs-outputs-data-display.component'
import { AppStore } from '../+store/app.model'

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
  // Uncomment code to test store values
  satellites$ = this.store.select(selectSatellites);
  selectedSatelliteId$ = this.store.select(selectSelectedSatId);
  selectSelectedSatellite$ = this.store.select(selectSelectedSatellite);
  constructor(private store: Store, private state: State<AppStore>) {
    console.log('state', this.state)
    this.satellites$.subscribe((res) => console.log(res));
    this.selectedSatelliteId$.subscribe((res) => console.log(res));
    this.selectSelectedSatellite$.subscribe((res) => console.log(res));
  }
}

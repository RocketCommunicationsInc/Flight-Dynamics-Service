import { Component } from '@angular/core'
import { Store, State } from '@ngrx/store'
import {
  selectSpacecrafts,
  selectSelectedSpacecraftId,
} from '../+store/app.reducer'
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
  spacecrafts$ = this.store.select(selectSpacecrafts)
  selectedSpacecraftId$ = this.store.select(selectSelectedSpacecraftId)
  // selectSelectedSatellite$ = this.store.select(selectSelectedSpacecraft)
  constructor(
    private store: Store,
    private state: State<AppStore>
  ) {
    console.log('state', this.state)
    this.spacecrafts$.subscribe((res) => console.log('spacecrafts', res))
    this.selectedSpacecraftId$.subscribe((res) => console.log(res))
    // this.selectSelectedSatellite$.subscribe((res) => console.log(res))
  }
}

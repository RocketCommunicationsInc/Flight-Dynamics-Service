import { Component } from '@angular/core';
import { UtilityToolkitComponent } from './utility-toolkit/utility-toolkit.component';
import { ScenarioDataDisplayComponent } from './scenario-data-display/scenario-data-display.component';
import { ScenarioLibraryComponent } from './scenario-library/scenario-library.component';
import { GlobalStatusBarComponent } from './global-status-bar/global-status-bar.component';
import { OutputDataDisplayComponent } from './output-data-display/output-data-display.component';
import { DataInputsOutputsComponent } from './data-inputs-outputs/data-inputs-outputs.component';
import { AstroComponentsModule } from '@astrouxds/angular';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    UtilityToolkitComponent,
    ScenarioDataDisplayComponent,
    ScenarioLibraryComponent,
    GlobalStatusBarComponent,
    OutputDataDisplayComponent,
    DataInputsOutputsComponent,
    AstroComponentsModule,
  ],
})
export class AppComponent {
  title = 'flight-dynamics';
}

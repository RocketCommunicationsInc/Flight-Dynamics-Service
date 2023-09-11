import { Component } from '@angular/core';
import { ScenarioDataDisplayComponent } from './scenario-data-display/scenario-data-display.component';
import { ScenarioLibraryComponent } from './scenario-library/scenario-library.component';
import { GlobalStatusBarComponent } from './global-status-bar/global-status-bar.component';
import { MainComponent } from './main/main.component';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    ScenarioDataDisplayComponent,
    ScenarioLibraryComponent,
    GlobalStatusBarComponent,
    MainComponent,
  ],
})
export class AppComponent {
  title = 'flight-dynamics';
}

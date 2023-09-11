import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular'

@Component({
  standalone: true,
  selector: 'app-scenario-data-display',
  templateUrl: './scenario-data-display.component.html',
  styleUrls: ['./scenario-data-display.component.css'],
  imports: [AstroComponentsModule]
})
export class ScenarioDataDisplayComponent {
  isDialogOpen: boolean = false;

  showDialog() {
    this.isDialogOpen = true;
  }
}

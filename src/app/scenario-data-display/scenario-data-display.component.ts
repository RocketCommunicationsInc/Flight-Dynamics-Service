import { Component, ElementRef } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { PropertiesDialogComponent } from '../properties-dialog/properties-dialog.component';
import { UnitConverterPipe } from '../unit-converter.pipe';
@Component({
  standalone: true,
  selector: 'app-scenario-data-display',
  templateUrl: './scenario-data-display.component.html',
  styleUrls: ['./scenario-data-display.component.css'],
  imports: [
    AstroComponentsModule,
    PropertiesDialogComponent,
    UnitConverterPipe,
  ],
})
export class ScenarioDataDisplayComponent {
  isDialogOpen: boolean = false;

  catalogId = 30184;
  semiMajorAxis = 63714327;
  perigee = 363396432;
  inclination = 23.4362;
  eccentricity = 92.39401;
  mass = 43.23404;
  currentAxisUnit: string = 'km';
  currentPerigeeUnit: string = 'km';
  currentInclinationUnit: string = 'deg';

  selectAxisUnit(event: any) {
    this.currentAxisUnit = event.detail.value;
  }

  selectPerigeeUnit(event: any) {
    this.currentPerigeeUnit = event.detail.value;
  }

  selectInclinationUnit(event: any) {
    this.currentInclinationUnit = event.detail.value;
  }

  showDialog() {
    this.isDialogOpen = true;
  }
}

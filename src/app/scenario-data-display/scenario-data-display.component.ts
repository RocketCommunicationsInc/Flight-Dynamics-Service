import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { PropertiesDialogComponent } from '../properties-dialog/properties-dialog.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UnitSelectorComponent } from '../shared';
import { UnitMenuItems, selectUnit } from '../shared/units/units.model';
import { DialogService } from '../services/dialog.service';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
@Component({
  standalone: true,
  selector: 'fds-scenario-data-display',
  templateUrl: './scenario-data-display.component.html',
  styleUrls: ['./scenario-data-display.component.css'],
  imports: [
    AstroComponentsModule,
    PropertiesDialogComponent,
    UnitSelectorComponent,
    RouterLink,
    RouterOutlet,
    CommonModule,
  ],
})
export class ScenarioDataDisplayComponent {
  constructor(private dialogService: DialogService) {}

  itemsDisplayed = this.dialogService.getSelectedProperties();

  catalogId = 30184;
  semiMajorAxis = 63714327;
  perigee = 363396432;
  inclination = 23.4362;
  eccentricity = 92.39401;
  mass = 43.28404;
  meanMotion = 1.790294538;
  longitutdeOfPeriapsis = 0.05;
  trueAnomaly = 0.1;
  meanAnomaly = 0.90723429381761343;
  raan = 206.6145;

  distanceUnits = [
    UnitMenuItems.meters,
    selectUnit(UnitMenuItems.kilometers),
    UnitMenuItems.miles,
  ];
  arcUnits = [
    selectUnit(UnitMenuItems.degrees),
    UnitMenuItems.radians,
    UnitMenuItems.revolutions,
  ];
}

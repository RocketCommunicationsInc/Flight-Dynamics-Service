import { Component } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';
import { PropertiesDialogComponent } from '../properties-dialog/properties-dialog.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UnitSelectorComponent } from '../shared';
import { UnitMenuItems, selectUnit } from '../shared/units/units.model';
import { DialogService } from '../services/dialog.service';
import { CommonModule } from '@angular/common';
import { dummyOptions } from '../properties-dialog/dummy-data';
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
  itemsDisplayed: any[] = [];
  ngOnInit() {
    this.dialogService.getSelectedProperties().subscribe((items) => {
      this.itemsDisplayed = items;
    });

    this.findValue();
  }
  dummyOptions = dummyOptions;

  valueDisplayed: { [key: string]: any } = {};
  unitDisplayed: any[] = [];
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

  findValue() {
    for (const items of this.itemsDisplayed) {
      const val = this.dummyOptions.find((item) => item.cb === items);
      if (val) {
        this.valueDisplayed[items] = val.value;
        if (val.unit === 'deg') {
          this.unitDisplayed = this.distanceUnits;
        } else if (val.unit === 'km') {
          this.unitDisplayed = this.arcUnits;
        } else if(val.unit === '') {
          this.unitDisplayed = []
        }
      }
    }
  }
}

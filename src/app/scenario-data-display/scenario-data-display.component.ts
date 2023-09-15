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
  dummyOptions = dummyOptions;

  ngOnInit() {
    this.dialogService.getSelectedProperties().subscribe((items) => {
      this.itemsDisplayed = items;
    });

    this.findValue();
  }

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

  valueDisplayed: { [key: string]: any } = {};
  unitDisplayed: { [key: string]: any } = {};

  isUnit: boolean = false;

  showInParentheses(value: string): string {
    return `(${value})`;
  }

  findValue() {
    for (const items of this.itemsDisplayed) {
      const val = this.dummyOptions.find((item) => item.cb === items);
      if (val) {
        console.log(val);
        this.valueDisplayed[items] = val.value;
        if (val.unit) {
          this.unitDisplayed[items] = this.showInParentheses(val.unit);

        }
      }
    }
  }
}

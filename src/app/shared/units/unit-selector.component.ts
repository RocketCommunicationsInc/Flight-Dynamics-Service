import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { UnitConverterPipe } from './unit-converter.pipe';
import { MenuItem, Unit } from './units.model';



@Component({
  selector: 'app-unit-selector',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule, UnitConverterPipe, NgFor],
  templateUrl: './unit-selector.component.html',
  styleUrls: ['./unit-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitSelectorComponent {
  _units: MenuItem[] = [];
  unit: Unit = 'km';

  @Input() value: any;
  @Input()
  set units(newUnits: MenuItem[]) {
    this._units = newUnits;
    this.unit = newUnits.find((val) => val.selected)?.val || newUnits[0].val;
  }

  setUnit({detail}: any) {
    this.unit = detail.value;
  }
}

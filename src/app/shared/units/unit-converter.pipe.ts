import { Pipe, PipeTransform } from '@angular/core';
import { Conversions } from './unit-conversions';
import { Unit } from './units.model';

@Pipe({
  name: 'unitConverter',
  standalone: true,
})
export class UnitConverterPipe implements PipeTransform {
  transform(value: number, unit: Unit): number | string {
    return Conversions[unit](value);
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Conversions } from './unit-conversions';
import { Unit } from './units.model';

@Pipe({
  name: 'unitConverter',
  standalone: true,
})
export class UnitConverterPipe implements PipeTransform {
  transform(value: any, unit: Unit): number | string {
    if (typeof value === 'number') return Conversions[unit](value);
    return value;
  }
}

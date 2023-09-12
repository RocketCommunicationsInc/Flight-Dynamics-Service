import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitConverter',
  standalone: true,
})
export class UnitConverterPipe implements PipeTransform {
  transform(value: number, unit: string): number | string {
    if (unit === 'm') {
      return value * 1000;
    } else if (unit === 'mi') {
      return value * 0.621371;
    } else if (unit === 'deg') {
      return `${value}\u00B0`;
    } else if (unit === 'rad') {
      return value * (Math.PI / 180);
    } else {
      return value;
    }
  }
}

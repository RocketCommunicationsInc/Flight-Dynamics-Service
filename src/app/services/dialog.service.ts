import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  selectedProperties: any[] = [
    'Catalog Id',
    'Eccentricity',
    'Mass',
    'Perigee',
    'Inclination',
    'Semi-Major Axis',
  ];
}

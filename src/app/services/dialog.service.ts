import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private selectedPropertiesSub = new BehaviorSubject<string[]>([
    'Catalog Id',
    'Eccentricity',
    'Mass',
    'Perigee',
    'Inclination',
    'Semi-Major Axis',
  ]);

  public getSelectedProperties() {
    return this.selectedPropertiesSub.asObservable();
  }

  updatedProperties(newProperties: string[]) {
    this.selectedPropertiesSub.next(newProperties);
  }
}

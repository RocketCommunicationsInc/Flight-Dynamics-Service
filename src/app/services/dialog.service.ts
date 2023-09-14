import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private selectedProperties: string[] = [
    'Catalog Id',
    'Eccentricity',
    'Mass',
    'Perigee',
    'Inclination',
    'Semi-Major Axis',
  ];
  getSelectedProperties() {
    console.log(this.selectedProperties, "grab the updated array")
    return this.selectedProperties
  }
  
  updatedProperties(newProperties: any[]) {
    this.selectedProperties = newProperties
    console.log(newProperties, "new properties")
  }


  

  // private selectedPropertiesSub = new BehaviorSubject<string[]>([
  //   'Catalog Id',
  //   'Eccentricity',
  //   'Mass',
  //   'Perigee',
  //   'Inclination',
  //   'Semi-Major Axis',
  // ])

  // selectedProperties = this.selectedPropertiesSub.asObservable()

  // updatedSelectedProperties(newProperties: string[]) {
  //   this.selectedPropertiesSub.next(newProperties)
  // }
}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSatellites, selectSelectedSatId } from '../store/app.reducer';
import { selectSelectedSatellite } from "../store/app.selectors"

@Component({
  selector: 'fds-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  satellites$ = this.store.select(selectSatellites)
  selectedSatelliteId$ = this.store.select(selectSelectedSatId)
  selectSelectedSatellite$ = this.store.select(selectSelectedSatellite)

  constructor(private store: Store) {
    this.satellites$.subscribe((res) => console.log(res));
    this.selectedSatelliteId$.subscribe((res) => console.log(res))
    this.selectSelectedSatellite$.subscribe((res) => console.log(res))
  }
}

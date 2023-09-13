import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSatellites } from '../store/app.reducer';

@Component({
  selector: 'fds-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  satellites$ = this.store.select(selectSatellites)

  constructor(
      private store: Store,

    ) {
      this.satellites$.subscribe(res => console.log(res))
    }
  
}

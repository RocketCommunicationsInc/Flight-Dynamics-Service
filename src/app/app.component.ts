import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'flight-dynamics';

  currentSpacecraft: any;

  onSelectedSpacecraft(spacecraft: any) {
    this.currentSpacecraft = spacecraft;
  }
}

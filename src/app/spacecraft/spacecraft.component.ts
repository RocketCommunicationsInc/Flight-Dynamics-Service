import { Component } from '@angular/core';

@Component({
  selector: 'app-spacecraft',
  templateUrl: './spacecraft.component.html',
  styleUrls: ['./spacecraft.component.css'],
})
export class SpacecraftComponent {
  isDialogOpen: boolean = false;

  showLogDialog() {
    this.isDialogOpen = true;
  }
}

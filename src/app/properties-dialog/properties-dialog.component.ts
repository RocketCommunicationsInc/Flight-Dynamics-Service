import { Component, Input } from '@angular/core';
import { AstroComponentsModule } from '@astrouxds/angular';

@Component({
  selector: 'app-properties-dialog',
  standalone: true,
  imports: [AstroComponentsModule],
  templateUrl: './properties-dialog.component.html',
  styleUrls: ['./properties-dialog.component.css'],
})
export class PropertiesDialogComponent {
  @Input() openDialog = false;

  handleClose() {
    this.openDialog = false;
  }
}

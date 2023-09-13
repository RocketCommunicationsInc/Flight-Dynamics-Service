import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-utilities-toolkit',
  templateUrl: './utilities-toolkit.component.html',
  styleUrls: ['./utilities-toolkit.component.css'],
})
export class UtilitiesToolkitComponent {
  @Input() spacecraft: any;

  ngOnInit() {
    this.spacecraft = 'Spacecraft A-1';
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'fds-propagator-util',
  standalone: true,
  imports: [AstroComponentsModule, RouterLink, RouterOutlet, CommonModule],
  templateUrl: './propagator-utility.component.html',
  styleUrls: ['./propagator-utility.component.css'],
})
export class PropagatorUtilityComponent {
  constructor(private router: Router) { }
  
  navigateBack() {
    this.router.navigateByUrl('/')
  }

}

import { Component } from '@angular/core';
import { AstroComponentsModule, RuxToastStack} from '@astrouxds/angular';

@Component({
  standalone: true,
  selector: 'fds-global-status-bar',
  templateUrl: './global-status-bar.component.html',
  styleUrls: ['./global-status-bar.component.css'],
  imports: [AstroComponentsModule],
})
export class GlobalStatusBarComponent {

  lightMode: Boolean;

  handleSelection(e: Event){
    const event = e as CustomEvent
    if(event.detail.value === 'mode'){
      const body = document.body;
      if(body){
        body.classList.toggle('light-theme')
      }
      this.lightMode = !this.lightMode
    }
    if(event.detail.value === 'unavailable'){
      console.log('toast goes here')
    }
  }

  constructor(){
    this.lightMode = false
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';

@Component({
  selector: 'fds-custom-segmented-button',
  standalone: true,
  imports: [CommonModule, AstroComponentsModule],
  templateUrl: './custom-segmented-button.component.html',
  styleUrls: ['./custom-segmented-button.component.css'],
})
export class CustomSegmentedButtonComponent {
  @Input() leftIcon: string = '';
  @Input() rightIcon: string = '';
  @Input() leftText: string = '';
  @Input() rightText: string = '';
  @Input() isLeftBtnActive = false;
  @Input() isRightBtnActive = false;
  @Output() leftClick = new EventEmitter();
  @Output() rightClick = new EventEmitter();
}

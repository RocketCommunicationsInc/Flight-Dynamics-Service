// https://gist.github.com/jonrimmer/eaabd619e2edeaebed83b7bc68f33daf
import {
  Directive,
  Input,
  Host,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  DoCheck,
} from '@angular/core';
import { NgSwitch } from '@angular/common';

@Directive({
  selector: '[multipleSwitchCase]',
  standalone: true,
})
export class MultipleSwitchCaseDirective implements OnInit, DoCheck {
  private ngSwitch: any; // set to any to access private methods on NgSwitch
  private _created = false;
  @Input() multipleSwitchCase: string[] | number[] = [];

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<Object>,
    @Host() ngSwitch: NgSwitch
  ) {
    this.ngSwitch = ngSwitch;
  }

  ngOnInit() {
    this.multipleSwitchCase.forEach(() => this.ngSwitch._addCase());
  }

  ngDoCheck() {
    let enforce = false;
    this.multipleSwitchCase.forEach((value) => {
      enforce = this.ngSwitch._matchCase(value) || enforce;
    });
    this.enforceState(enforce);
  }

  enforceState(created: boolean) {
    if (created && !this._created) {
      this._created = true;
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (!created && this._created) {
      this._created = false;
      this.viewContainer.clear();
    }
  }
}

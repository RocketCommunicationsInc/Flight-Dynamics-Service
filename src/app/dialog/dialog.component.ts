import { Component, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

// @Directive({
//   selector: '[ifAuthorized]'
// })

export class DialogComponent {
constructor(private templateRef: TemplateRef<any>, 
  private viewContainerRef: ViewContainerRef) {}

  @Input() openDialog = false
}

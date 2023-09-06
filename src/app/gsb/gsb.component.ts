import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-gsb',
  templateUrl: './gsb.component.html',
  styleUrls: ['./gsb.component.css'],
})
export class GsbComponent {
  constructor(private toast: ElementRef) {}
  selectedItem: string | undefined;
  addToast: boolean = false


  showToast() {


  // message: string;
  // hideClose: boolean;
  // closeAfter: number;

    const toastStack = this.toast.nativeElement.querySelector('rux-toast-stack')

    toastStack.addToast({
      message: 'This feature has not been implemented',
      hideClose: true,
      closeAfter: 3000, 
    })
  }

  // showToast() {
  //   const toast = {
  //     message: 'This feature has not been implemented',
  //     hideClose: true,
  //     closeAfter: 3000, 
  //   }
  // }

  menuSelect(event: any): void {
    this.selectedItem ? this.addToast = true : this.addToast = false
    console.log(event)
  }

  // @ViewChild('gsbPopUpMenu')
  //   myTestPopUpMenu: any
  //   async onAction() {
  //       await this.myTestPopUpMenu.nativeElement.isOpen()
  //       alert('works')

  //   }
}

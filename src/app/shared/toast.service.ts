import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastConfig {
  message: string;
  hideClose: boolean;
  closeAfter: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _stackSubject = new BehaviorSubject<ToastConfig | null>(null);

  public getStack() {
    return this._stackSubject.asObservable();
  }

  public addToast(config: ToastConfig) {
    this._stackSubject.next(config);
  }

  public defaultToast() {
    this.addToast({
      message: 'This feature has not been implemented.',
      hideClose: false,
      closeAfter: 3000,
    });
  }
}

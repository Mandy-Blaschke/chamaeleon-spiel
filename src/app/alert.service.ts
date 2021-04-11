import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  internalMessage: string = null;

  constructor() {
  }

  showAlert(message: string): void {
    this.internalMessage = message;
  }
}

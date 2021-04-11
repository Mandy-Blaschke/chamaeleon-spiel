import {Component, OnInit} from '@angular/core';
import {MainService} from '../main.service';
import {AlertService} from '../alert.service';

@Component({
  selector: 'app-startseite',
  templateUrl: './startseite.component.html',
  styleUrls: ['./startseite.component.scss']
})
export class StartseiteComponent implements OnInit {
  username = '';

  constructor(public service: MainService, public alert: AlertService) {
  }

  ngOnInit(): void {
  }

  async newGameRequest(): Promise<void> {
    // Abbruch der Spielerstellung, wenn kein Nutzername
    if (this.username.trim() === '') {
      this.alert.showAlert('Spielernamen angeben!');
      // Spiel kann erstellt werden
    } else {
      await this.service.createNewGame(this.username);
      this.alert.internalMessage = null;
    }
  }
}

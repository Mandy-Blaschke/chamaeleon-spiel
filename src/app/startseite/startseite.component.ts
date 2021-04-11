import {Component, OnInit} from '@angular/core';
import {MainService} from '../main.service';

@Component({
  selector: 'app-startseite',
  templateUrl: './startseite.component.html',
  styleUrls: ['./startseite.component.scss']
})
export class StartseiteComponent implements OnInit {
  username = '';

  constructor(public service: MainService) {
  }

  ngOnInit(): void {
  }

  async newGameRequest(): Promise<void> {
    // Abbruch der Spielerstellung, wenn kein Nutzername
    if (this.username.trim() === '') {
      alert('Username muss gesetzt werden');
      // Spiel kann erstellt werden
    } else {
      await this.service.createNewGame(this.username);
    }
  }
}

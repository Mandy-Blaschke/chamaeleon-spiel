import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainService} from '../main.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  private intervalHandle: number;

  constructor(public service: MainService, private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    const sessionGameId = sessionStorage.getItem('gameId');
    const sessionPlayerName = sessionStorage.getItem('playerName');

    if (sessionGameId != null && sessionPlayerName != null) {
      // Rekonstruktion der Spielsession
      this.service.activeGame = await this.service.loadFromServer(sessionGameId);
      this.service.playerName = sessionPlayerName;
    }

    if (this.service.activeGame == null) {
      this.router.navigate(['/startseite']).then();
    } else {
      sessionStorage.setItem('gameId', this.service.activeGame.gameId);
      sessionStorage.setItem('playerName', this.service.playerName);
      this.intervalHandle = setInterval(() => {
        this.service.updateActiveGame().then();
      }, 2500);
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.intervalHandle);
  }

  generateJoinLink(): string {
    return location.protocol + '//' + location.host + '/join/' + this.service.activeGame.gameId;
  }


}

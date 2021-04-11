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

  ngOnInit(): void {
    if (this.service.activeGame == null) {
      this.router.navigate(['/startseite']).then();
    } else {
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

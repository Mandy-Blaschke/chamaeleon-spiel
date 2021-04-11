import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(public service: MainService) { }

  ngOnInit(): void {
  }

  generateJoinLink(): string {
    return location.protocol + '//' + location.host + '/join/' + this.service.activeGame.gameId;
  }

}

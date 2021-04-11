import {Component, OnInit} from '@angular/core';
import {MainService} from '../main.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
  playerName = '';

  constructor(private service: MainService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  joinRequest(): void {
    if (this.playerName.trim() === '') {
      alert('Spielername setzen');
    } else {
      const gameId = this.activatedRoute.snapshot.paramMap.get('gameId');
      // TODO react on failure
      const joinSuccessful = this.service.joinActiveGame(gameId, this.playerName);
      if (!joinSuccessful) {
        alert('Spielername bereits vergeben!');
      }
    }
  }
}

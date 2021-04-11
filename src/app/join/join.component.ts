import {Component, OnInit} from '@angular/core';
import {MainService} from '../main.service';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '../alert.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
  playerName = '';

  constructor(private service: MainService, private activatedRoute: ActivatedRoute, private alert: AlertService) {
  }

  ngOnInit(): void {
  }

  joinRequest(): void {
    if (this.playerName.trim() === '') {
      this.alert.showAlert('Spielernamen angeben!');
    } else {
      const gameId = this.activatedRoute.snapshot.paramMap.get('gameId');
      // TODO react on failure
      const joinSuccessful = this.service.joinActiveGame(gameId, this.playerName);
      if (!joinSuccessful) {
        this.alert.showAlert('Spielername ist vergeben!');
      }
    }
  }
}

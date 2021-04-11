import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  constructor(public service: MainService) { }

  ngOnInit(): void {
  }

}

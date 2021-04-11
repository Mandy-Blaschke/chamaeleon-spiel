import { Component, OnInit } from '@angular/core';
import {AlertService} from '../alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(public alert: AlertService) { }

  ngOnInit(): void {
  }

}

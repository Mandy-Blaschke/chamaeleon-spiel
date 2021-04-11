import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showRules = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleRules(): void {
    this.showRules = this.showRules !== true;
  }

}

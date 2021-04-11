import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartseiteComponent } from './startseite/startseite.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { JoinComponent } from './join/join.component';
import { GameComponent } from './game/game.component';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './button/button.component';
import { PlayersComponent } from './players/players.component';

@NgModule({
  declarations: [
    AppComponent,
    StartseiteComponent,
    JoinComponent,
    GameComponent,
    HeaderComponent,
    ButtonComponent,
    PlayersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

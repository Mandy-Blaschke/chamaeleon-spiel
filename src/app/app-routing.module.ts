import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StartseiteComponent} from './startseite/startseite.component';
import {JoinComponent} from './join/join.component';
import {GameComponent} from './game/game.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'startseite'},
  {path: 'startseite', component: StartseiteComponent},
  {path: 'join/:gameId', component: JoinComponent},
  {path: 'game', component: GameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

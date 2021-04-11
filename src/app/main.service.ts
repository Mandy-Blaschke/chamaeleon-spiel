import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  playerName: string;

  activeGame: Gameplay;

  constructor(private http: HttpClient, private router: Router) {
  }

  async createNewGame(gameMaster: string): Promise<void> {
    this.playerName = gameMaster;
    const gameplay: Gameplay = {
      gameId: createGameId(),
      master: gameMaster,
      player: [gameMaster],
      state: 'waiting',
      word: '',
      chameleon: null,
    };
    await this.writeToServer(gameplay);
    this.activeGame = gameplay;
    await this.router.navigate(['/game']);
  }

  async writeToServer(game: Gameplay): Promise<void> {
    const url = 'https://api.mandy-blaschke.de/user/public/object/chamaeleon_' + game.gameId;
    await this.http.put(url, game).toPromise();
  }

  async loadFromServer(gameId: string): Promise<Gameplay> {
    const url = 'https://api.mandy-blaschke.de/user/public/object/chamaeleon_' + gameId;
    return await this.http.get<Gameplay>(url).toPromise();
  }

  async joinActiveGame(gameId: string, playerName: string): Promise<boolean> {
    // TODO: Gameroute in LocalStorage speichern
    const game = await this.loadFromServer(gameId);

    if (game.player.includes(playerName)) {
      return false;
    } else {
      game.player.push(playerName);
      await this.writeToServer(game);
      // TODO evt. Standüberschreibung checken
      this.activeGame = game;
      this.playerName = playerName;
      await this.router.navigate(['/game']);
      return true;
    }
  }

  async newRound(): Promise<void> {
    this.activeGame = await this.loadFromServer(this.activeGame.gameId);
    this.activeGame.state = 'guessing';
    // TODO: random Wort
    this.activeGame.word = 'haus';
    // TODO: random Spieler
    this.activeGame.chameleon = this.activeGame.player[0];
    await this.writeToServer(this.activeGame);
  }

  async updateActiveGame(): Promise<void> {
    this.activeGame = await this.loadFromServer(this.activeGame.gameId);
  }
}

export interface Gameplay {
  gameId: string;
  master: string;
  player: string[];
  state: 'waiting' | 'guessing';
  word: string;
  chameleon: string;
}

function createGameId(): string {
  return Math.round(Math.random() * 1000000000).toString();
}

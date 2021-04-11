import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {WORDS} from './words';

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
      players: [gameMaster],
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
    const game = await this.loadFromServer(gameId);

    if (game.players.includes(playerName)) {
      return false;
    } else {
      game.players.push(playerName);
      await this.writeToServer(game);
      this.activeGame = game;
      this.playerName = playerName;
      await this.router.navigate(['/game']);
      return true;
    }
  }

  async newRound(): Promise<void> {
    this.activeGame = await this.loadFromServer(this.activeGame.gameId);
    this.activeGame.state = 'guessing';
    this.activeGame.word = WORDS[Math.round(Math.random() * WORDS.length)];
    // TODO: random Spieler
    this.activeGame.chameleon = this.activeGame.players[Math.round(Math.random() * this.activeGame.players.length)];
    await this.writeToServer(this.activeGame);
  }

  async updateActiveGame(): Promise<void> {
    this.activeGame = await this.loadFromServer(this.activeGame.gameId);
  }
}

export interface Gameplay {
  gameId: string;
  master: string;
  players: string[];
  state: 'waiting' | 'guessing';
  word: string;
  chameleon: string;
}

function createGameId(): string {
  return Math.round(Math.random() * 1000000000).toString();
}

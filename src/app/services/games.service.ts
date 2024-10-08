import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/gameProfile';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private allGames: GameProfile[] = [
    new GameProfile(
      1,
      'Trivia',
      "Choose every word's translation from a list of 4 options",
      'trivia'
    ),
    new GameProfile(
      2,
      'Mixed Letters',
      'Practice spelling, by finding the right order of letters for every word in category',
      'mixed'
    ),
    new GameProfile(
      3,
      'Word Sorter',
      'Categorize words by dragging and dropping them into the right category',
      'wordsorter'
    ),
    new GameProfile(
      4,
      'cards memory game',
      'find per of words, in each per: the english word and translation in hebrew',
      'memory'
    ),
  ];

  list(): GameProfile[] {
    return this.allGames;
  }
}

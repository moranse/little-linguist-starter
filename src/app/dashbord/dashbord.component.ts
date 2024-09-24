import { CategoriesService } from './../services/categories.service';
import { GamesService } from './../services/games.service';
import { gameResultService } from './../services/gameResult.service';
import { gameResult } from './../../shared/model/gameResult';
import { Component, OnInit } from '@angular/core';
import { GameProfile } from '../../shared/model/gameProfile';
import { Category } from '../../shared/model/category';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule,MatCardModule],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css',
})
export class DashbordComponent implements OnInit {
  allGames: GameProfile[] = [];
  allGameResult: gameResult[] = [];
  allCategory: Category[] = [];
  numberOfPoints: number = 0;
  numberOfgamesPlayed: number = 0;
  gameMixed: gameResult[] = [];
  gameSorter: gameResult[] = [];
  gameTriva: gameResult[] = [];
  sumMixedGame = 0;
  avgMixedGame = 0;
  sumSorterGame = 0;
  avgSorterGame = 0;
  gameMaxAvg = '';
  gameMinAvg = '';
  playedCategorys = 0;
  notPlayedCateory = 0;
  percentOfPerfectScore = 0;
  categorysNumberOfPlayed: Map<string, number> = new Map<string, number>();
  maxCategoryPlayedId = '';
  maxCategoryPlayed = '';
  percentsCategorysLearned = 0;
  isFullyLoaded = false;
  gamesThisMonth :gameResult[] = [];
  gamesNeeded=0;
  currentDate = new Date();
  streak = 0;

  constructor(
    private gameResultService: gameResultService,
    private CategoriesService: CategoriesService,
    private GamesService: GamesService
  ) {}

  ngOnInit(): void {
    this.allGames = this.GamesService.list();
    this.gameResultService.list().then((result: gameResult[] | undefined) => {
      if (result !== undefined) {
        this.allGameResult = result;
        console.log(this.allGameResult);
        let sumOfPerfectGame = 0;

// Calculate number of games played in the current month
const today = new Date();
const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
this.gamesThisMonth = this.allGameResult.filter(
  (game) => new Date(game.date) >= firstDayOfMonth
);

// Calculate streak of days playing games
while (this.hasGameOnDay(this.currentDate)) {
  this.streak++;
  this.currentDate.setDate(this.currentDate.getDate() - 1);
}
console.log("Current streak:", this.streak);

        for (let x = 0; x < this.allGameResult.length; x++) {
          if (this.allGameResult[x].pointsNumber === 100) {
            sumOfPerfectGame++;
          }
          this.numberOfPoints += this.allGameResult[x].pointsNumber;
          if (Number(this.allGameResult[x].gameID) === 3) {
            //for sorting game word sorter
            this.gameSorter.push(this.allGameResult[x]);
          } else if (Number(this.allGameResult[x].gameID) === 2) {
            //for sorting game mixed letters
            this.gameMixed.push(this.allGameResult[x]);
          } else {
            //for sorting game Trivia - not in use yet
            this.gameTriva.push(this.allGameResult[x]);
          }
        }

// Calculate games needed to reach the challenge (20)
this.gamesNeeded = 20 - this.gamesThisMonth.length;
if (this.gamesThisMonth.length >= 20) {
  console.log("Congratulations! You've met the monthly challenge")
} else {
  console.log("You've played " + this.gamesThisMonth.length +" games this month. Play another " +this.gamesNeeded + " games to reach the monthly challenge of 20 games!")
}
        this.percentOfPerfectScore =
          (sumOfPerfectGame / this.allGameResult.length) * 100;

        this.numberOfgamesPlayed = this.allGameResult.length;
        for (let x = 0; x < this.gameSorter.length; x++) {
          this.sumSorterGame += this.gameSorter[x].pointsNumber;
        }
        this.avgSorterGame = this.sumSorterGame / this.gameSorter.length;
        for (let x = 0; x < this.gameMixed.length; x++) {
          this.sumMixedGame += this.gameMixed[x].pointsNumber;
        }
        this.avgMixedGame = this.sumMixedGame / this.gameMixed.length;
        if (this.avgMixedGame > this.avgSorterGame) {
          this.gameMaxAvg = 'Mixed Letters Game';
          this.gameMinAvg = 'Word Sorter Game';
        } else {
          this.gameMaxAvg = 'Word Sorter Game';
          this.gameMinAvg = 'Mixed Letters Game';
        }
        this.CategoriesService.list().then((result: Category[] | undefined) => {
          if (result !== undefined) {
            this.allCategory = result;
            for (let x = 0; x < this.allCategory.length; x++) {
              let played = 0;
              for (let y = 0; y < this.allGameResult.length; y++) {
                if (
                  this.allGameResult[y].categoryID === this.allCategory[x].id
                ) {
                  played++;
                }
              }
              this.categorysNumberOfPlayed.set(this.allCategory[x].id, played);
              let maxCategoryPlayed = Number.MIN_SAFE_INTEGER;

              for (const [
                key,
                value,
              ] of this.categorysNumberOfPlayed.entries()) {
                if (value > maxCategoryPlayed) {
                  maxCategoryPlayed = value;
                  this.maxCategoryPlayedId = key;
                }
              }
              if (played > 0) {
                this.playedCategorys++;
              }
            }
            this.afterLoadingDashbored();
          }
        });        
      }
      this.isFullyLoaded = true;
    });
  }

  afterLoadingDashbored() {
    this.notPlayedCateory =
      this.allCategory.length - this.playedCategorys;
    this.maxCategoryPlayed = this.allCategory.filter(
      (category) => category.id === this.maxCategoryPlayedId
    )[0].name;
    this.percentsCategorysLearned = (this.playedCategorys / this.allCategory.length) * 100;
  }

  hasGameOnDay(date: Date): boolean {
    return this.allGameResult.some((gameResult) => {
      const gameDate = new Date(gameResult.date);
      return gameDate.getFullYear() === date.getFullYear() &&
             gameDate.getMonth() === date.getMonth() &&
             gameDate.getDate() === date.getDate();
    });
  }

}




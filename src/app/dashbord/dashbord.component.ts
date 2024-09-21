import { CategoriesService } from './../services/categories.service';
import { GamesService } from './../services/games.service';
import { gameResultService } from './../services/gameResult.service';
import { gameResult } from './../../shared/model/gameResult';
import { Component, OnInit } from '@angular/core';
import { GameProfile } from '../../shared/model/gameProfile';
import { Category } from '../../shared/model/category';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [],
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
  sumMixed = 0;
  avgMixed = 0;
  sumSorter = 0;
  avgSorter = 0;
  gameMaxAvg = '';
  gameMinAvg = '';
  playedCategorys = 0;
  notPlayedCateory = 0;

  constructor(
    private gameResultService: gameResultService,
    private CategoriesService: CategoriesService, private GamesService: GamesService,
  ) {}

  ngOnInit(): void {
    this.allGames=this.GamesService.list();
    this.gameResultService.list().then((result: gameResult[] | undefined) => {
      if (result !== undefined) {
        this.allGameResult = result;
        console.log(this.allGameResult);
        for (let x = 0; x < this.allGameResult.length; x++) {
          this.numberOfPoints += this.allGameResult[x].pointsNumber;
          if (Number(this.allGameResult[x].gameID) === 3) {
            //for sorting game word sorter
            this.gameSorter.push(this.allGameResult[x]);
            this.allGames[this.allGameResult[x].gameID].gamesPlayed.push()
          } else if (Number(this.allGameResult[x].gameID) === 2) {
            //for sorting game mixed letters
            this.gameMixed.push(this.allGameResult[x]);
          } else {
            //for sorting game Trivia - not in use yet
            this.gameTriva.push(this.allGameResult[x]);
          }
        }
        this.numberOfgamesPlayed = this.allGameResult.length;
        for (let x = 0; x < this.gameSorter.length; x++) {
          this.sumSorter += this.gameSorter[x].pointsNumber;
        }
        this.avgSorter = this.sumSorter / this.gameSorter.length;
        for (let x = 0; x < this.gameMixed.length; x++) {
          this.sumMixed += this.gameMixed[x].pointsNumber;
        }
        this.avgMixed = this.sumMixed / this.gameMixed.length;
        if (this.avgMixed > this.avgSorter) {
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
              if (played > 0) {
                this.playedCategorys++;
              }
            }
            this.notPlayedCateory =
              this.allCategory.length - this.playedCategorys;
            this.loadingDashbored();
          }
        });
      }
    });
  }
  loadingDashbored() {
    console.log('number of points in all games: ' + this.numberOfPoints);
    console.log('number of games played: ' + this.numberOfgamesPlayed);
    console.log('the AVG of sorter game: ' + this.avgSorter);
    console.log('the AVG of Mixed game: ' + this.avgMixed);
    console.log('the game with max AVG:  ' + this.gameMaxAvg);
    console.log('the game with min AVG:  ' + this.gameMinAvg);
    console.log(
      'the number of categorys that have played: ' + this.playedCategorys
    );
    console.log(
      'the number of categorys that have NOT played: ' + this.notPlayedCateory
    );
  }
}

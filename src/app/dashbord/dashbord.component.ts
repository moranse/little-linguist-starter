import { CategoriesService } from './../services/categories.service';
import { GamesService } from './../services/games.service';
import { gameResultService } from './../services/gameResult.service';
import { gameResult } from './../../shared/model/gameResult';
import { Component, OnInit } from '@angular/core';
import { GameProfile } from '../../shared/model/gameProfile';
import { Category } from '../../shared/model/category';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [MatProgressSpinnerModule,CommonModule],
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
  percentOfPerfectScore=0;
  categorysNumberOfPlayed: Map<string,number>=new Map<string,number>;
  maxCategoryPlayedId='';
  maxCategoryPlayed='';
  percentsCategorysLearned=0;
  isFullyLoaded=false;

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
        let sumOfPerfectGame=0;

        for (let x = 0; x < this.allGameResult.length; x++) {
          if(this.allGameResult[x].pointsNumber===100){
            sumOfPerfectGame++;
          }
          this.numberOfPoints += this.allGameResult[x].pointsNumber;
          if (Number(this.allGameResult[x].gameID) === 3) {
            //for sorting game word sorter
            this.gameSorter.push(this.allGameResult[x]);
           // this.allGames[this.allGameResult[x].gameID].gamesPlayed.push()
          } else if (Number(this.allGameResult[x].gameID) === 2) {
            //for sorting game mixed letters
            this.gameMixed.push(this.allGameResult[x]);
          } else {
            //for sorting game Trivia - not in use yet
            this.gameTriva.push(this.allGameResult[x]);
          }
        }         
        this.percentOfPerfectScore=(sumOfPerfectGame/this.allGameResult.length)*100;

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
              this.categorysNumberOfPlayed.set(this.allCategory[x].id,played);
              let maxCategoryPlayed = Number.MIN_SAFE_INTEGER;

              for (const [key, value] of this.categorysNumberOfPlayed.entries()) {
                if (value > maxCategoryPlayed) {
                  maxCategoryPlayed = value;
                  this.maxCategoryPlayedId=key;
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
      this.isFullyLoaded=true;
    });
  }
  loadingDashbored() {
    console.log('number of points in all games: ' + this.numberOfPoints);
    console.log('number of games played: ' + this.numberOfgamesPlayed);
    console.log('the AVG of sorter game: ' + this.avgSorterGame);
    console.log('the AVG of Mixed game: ' + this.avgMixedGame);
    console.log('the game with max AVG:  ' + this.gameMaxAvg);
    console.log('the game with min AVG:  ' + this.gameMinAvg);
    console.log(
      'the number of categorys that have played: ' + this.playedCategorys
    );
    console.log(
      'the number of categorys that have NOT played: ' + this.notPlayedCateory
    );
    console.log('percents of games with perfect score: '+this.percentOfPerfectScore);
    console.log('category most  played: '+ this.categorysNumberOfPlayed);
    this.maxCategoryPlayed=this.allCategory.filter(category=>category.id===this.maxCategoryPlayedId)[0].name;
    console.log(' max category played: '+ this.allCategory.filter(category=>category.id===this.maxCategoryPlayedId)[0].name)
    this.percentsCategorysLearned=(this.playedCategorys/this.allCategory.length)*100;
    console.log("percents of categorys have learned: "+(this.playedCategorys/this.allCategory.length)*100)
  }
}

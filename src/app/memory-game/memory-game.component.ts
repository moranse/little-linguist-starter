import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameProfile } from '../../shared/model/gameProfile';
import { GamesService } from '../services/games.service';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../../shared/model/category';
import { MatIconModule } from '@angular/material/icon';
import { ExitGameDialogComponent } from '../exit-game-dialog/exit-game-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { TranslatedWord } from '../../shared/model/translated-word';
import { SuccessOrFailDialogComponent } from '../success-or-fail-dialog/success-or-fail-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-memory-game',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './memory-game.component.html',
  styleUrl: './memory-game.component.css',
})
export class MemoryGameComponent implements OnInit {
  @Input() id?: any;
  //  @Input() id?: GameProfile;
  allGames: GameProfile[] = [];
  index = 0; //for showing the curent word
  currentCategory?: Category;
  progressValue = 0; //for incrimet the progrees value
  startPlace = 1; //to show number of words in category
  endPlace = 1; //to show how many words left in category
  isFullyLoaded = false;
  usersAnser: string = '';
  clickButton: boolean = true;
  textOfSuccessOrFail: string = ''; //to show the user if got right or rong answer
  textOfButton: string = '';
  anser = ['']; //dialog parameter
  goodAnswer = 0; 
  badAnswer = 0;
  summery: number[] = []; //array of the users anser and category id
  wordStatus: number[] = []; //array of the word status if user anser correct or not
  points = 0; //how many points for each good answer
  coins = 0; //the number of coins the user got
  shufPer = ''; //the word that shuffeld
  randomWordArray: {isFlipped: boolean; word:string; categoryWordID: number}[] = []; //for rundoming the words in array
  randomNumber = -1;
  // cardGrid: { isFlipped: boolean; word: { origin: string; target: string } }[] = [];
  cardGrid: {  categoryWordID: number; isOrigin:boolean; isFlipped: boolean }[] = [];
  firstFlippedCard:{  categoryWordID: number; isOrigin:boolean ; isFlipped: boolean} | null=null;
  totalWords: number = 0;
  score: number = 0;
  card1:string='';
  card2:string='';


  constructor(
    private gamesService: GamesService,
    private categoriesService: CategoriesService,
    private dialogService: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.allGames = this.gamesService.list();
    if (this.id !== undefined) {
      this.categoriesService
        .get(this.id)
        .then((result: Category | undefined) => {
          this.currentCategory = result;
    if (this.currentCategory != undefined) {
      
      this.points=Math.floor(100/this.currentCategory.words.length);
this.cardGridCreat();
this.shuffleWord();
          }
          this.isFullyLoaded = true;
        });
    }
  }

  cardGridCreat(){
    if(this.currentCategory!==undefined){
    for(let i=0;i<this.currentCategory.words.length;i++){
      // this.cardGrid[i].isFlipped=false;
      this.cardGrid.push({categoryWordID:i,isOrigin:false,isFlipped:false});
      this.cardGrid.push({categoryWordID:i,isOrigin:true,isFlipped:false});  
      }
    }
  }

  shuffleWord() {
    // Shuffle the word in randomWordArray
    for (let i = this.cardGrid.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cardGrid[i], this.cardGrid[j]] = [this.cardGrid[j], this.cardGrid[i]];
    }
  }

  exitGame() {
    //for closing dialog
    const dialogRef = this.dialogService.open(ExitGameDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('add routing to choose game');
      }
    });
  }

  showCardWord(index:number): string{
if(this.currentCategory?.words!==undefined){
 if( this.cardGrid[index].isOrigin){
  return this.currentCategory.words[this.cardGrid[index].categoryWordID].origin;
 }
 return this.currentCategory.words[this.cardGrid[index].categoryWordID].target;
}
return '';
  }

  flipCardAndCheckMatch(cardIndex: number) {
if(this.firstFlippedCard!==null){
  this.cardGrid[cardIndex].isFlipped=true;
  if(this.cardGrid[cardIndex].categoryWordID===this.firstFlippedCard.categoryWordID){
    console.log("Cards Matched!");
    this.goodAnswer++;
    this.coins+=this.points;
    this.firstFlippedCard=null;
    this.checkGameOver();
  }else{
    console.log("Cards NOT Matched!");
    this.badAnswer++;
if(this.goodAnswer+this.badAnswer>=this.cardGrid.length/2){
  this.coins-=2;
}
    setTimeout(() => {
      if(this.firstFlippedCard!==null){
        this.cardGrid[cardIndex].isFlipped=false;
        this.firstFlippedCard.isFlipped=false;
      }
      this.firstFlippedCard=null;
    }, 2000);
  }
}else{
  if(!this.cardGrid[cardIndex].isFlipped){
    this.firstFlippedCard=this.cardGrid[cardIndex];
    this.cardGrid[cardIndex].isFlipped=true;

  }
}
  console.log(cardIndex)
  }
  
  checkGameOver() {
    // Check if all cards are flipped (isFlipped = true) and handle game completion
    for (let i =0 ;i<this.cardGrid.length;i++) {
if(this.cardGrid[i].isFlipped===false){
  console.log("not all cardes flipped");
  return
  }
    }
    this.summery.push(this.goodAnswer);
    this.summery.push(this.badAnswer);
    this.summery.push(this.coins);
this.routToSummery();
  }

  routToSummery() {
    this.router.navigate(['summery/' + this.id], {
      queryParams: {
        summery: encodeURIComponent(JSON.stringify(this.summery)),
        wordStatus: encodeURIComponent(JSON.stringify(this.wordStatus)),
        wordsNewArray: encodeURIComponent(
          JSON.stringify(this.currentCategory?.words)
        ),
        gameID: 4,
      },
    });
  }
}

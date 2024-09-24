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
  randomWordArray: TranslatedWord[] = []; //for keeping the new order of words that random
  randomOrigenWord = ''; //for keeping the random origen word from category
  randomTargetWord = ''; //for keeping the random target word from category
  randomNumber = -1;
  cardGrid: { isFlipped: boolean; word: { origin: string; target: string } }[] = [];
  firstFlippedCard: any;
  totalWords: number = 0;
  score: number = 0;

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
            const stepValue = 100 / this.currentCategory.words.length;
            this.progressValue = stepValue;
            this.endPlace = this.currentCategory?.words.length;

            this.totalWords = this.currentCategory.words.length;
            this.cardGrid = this.currentCategory.words.map((word) => ({
              isFlipped: false,
              word: { origin: word.origin, target: word.target },
            }));
console.log(this.cardGrid)

          }
          this.isFullyLoaded = true;
        });
    }
  }

  shuffleWord() {
    // Shuffle the entire cardGrid using Fisher-Yates algorithm
    for (let i = this.cardGrid.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cardGrid[i], this.cardGrid[j]] = [this.cardGrid[j], this.cardGrid[i]];
    }
  }
        

  getOrigenWord() {
    //get the origen word
    return this.currentCategory?.words[this.index].target;
  }

  nextStage() {
    //all i check befor moving to next stage
    if (this.currentCategory?.words.length != undefined) {
      //for handeling the undefined use case
      this.points = Math.floor(100 / this.currentCategory.words.length); //how many points for each good answer
      if (
        this.usersAnser.toUpperCase() ==
        this.currentCategory.words[this.index].origin.toUpperCase()
      ) {
        this.textOfSuccessOrFail = 'Great Job!';
        this.textOfButton = 'CONTINUE';
        this.anser = [this.textOfSuccessOrFail, this.textOfButton];
        this.SuccessOrFailDialog();
        console.log('corect answer - add to summery');
        this.goodAnswer++;
        this.wordStatus.push(1); //represant corect answer
        this.coins = this.coins + this.points; //cakculate the number of points
      } else {
        this.textOfSuccessOrFail =
          'incorect, give it another try! I belive in you!';
        this.textOfButton = 'Got it';
        this.anser = [this.textOfSuccessOrFail, this.textOfButton];
        this.SuccessOrFailDialog();
        console.log('wrong answer - add to summery');
        this.badAnswer++;
        this.wordStatus.push(0); //represant rong answer
      }
      const stepValue = 100 / this.currentCategory?.words.length;
      this.progressValue += stepValue;
      this.index++;
      this.howManyWordsLeft();
      this.resetInput();
      console.log('before last word');
      if (this.index == this.currentCategory?.words.length) {
        console.log('after finishing all words');
        this.summery.push(this.goodAnswer); //add the finael rezultes of the users answer to summery arry
        console.log(this.summery);
        this.summery.push(this.badAnswer); //add the finael rezultes of the users answer to summery arry
        this.routToSummery();
      } else {
        this.shuffleWord();
      }
    }
  }

  doUserAnser() {
    //for checking if user is typing. the word. the word is shuffled every time the user is typing because of the using of two way data binding
    if (this.usersAnser != '') {
      //for having anser from the user
      console.log('the user is typing');
      this.clickButton = false;
      console.log('user anser. ' + 'the click value is: ' + this.clickButton);
      return false;
    } else {
      this.clickButton = true;
      console.log(
        'user didnt anser. ' + 'the click value is: ' + this.clickButton
      );
      return true;
    }
  }

  resetInput() {
    //for resting the input
    this.usersAnser = '';
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

  SuccessOrFailDialog() {
    const dialogRef = this.dialogService.open(SuccessOrFailDialogComponent, {
      data: this.anser,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('show the success or failer to the user');
      }
    });
  }

  howManyWordsLeft() {
    //calculate number of words im category
    if (this.currentCategory?.words.length != undefined) {
      //for handeling the undefined use case
      this.startPlace = this.index + 1;
      this.endPlace = this.currentCategory.words.length;
    }
  }
  flipCard(cardIndex: number) {
    const card = this.cardGrid[cardIndex];
    if (!card.isFlipped) {
      card.isFlipped = true;
      if (!this.firstFlippedCard) {
        this.firstFlippedCard = card;
      } else {
        if (this.firstFlippedCard.word.origin === card.word.origin) {
          this.score += this.calculatePointsPerMatch(); // Add points for correct match
        } else {
          this.deductPointsForIncorrectMatch();
        }
        this.firstFlippedCard = null;
        this.checkGameOver(); // Check if all cards are matched
      }
    }
  }
  
  calculatePointsPerMatch() {
    return 100 / this.totalWords;
  }
  
  deductPointsForIncorrectMatch() {
    // Adjust deduction logic as needed (e.g., deduct a percentage of points per attempt)
    this.score -= this.calculatePointsPerMatch() / 2;
  }
  
  checkGameOver() {
    // Check if all cards are flipped (isFlipped = true) and handle game completion
  }

  routToSummery() {
    console.log(this.summery);
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

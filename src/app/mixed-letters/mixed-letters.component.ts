import { TranslatedWord } from './../../shared/model/translated-word';
import { SuccessOrFailDialogComponent } from './../success-or-fail-dialog/success-or-fail-dialog.component';
import { CategoriesService } from './../services/categories.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameProfile } from '../../shared/model/gameProfile';
import { GamesService } from '../services/games.service';
import { Category } from '../../shared/model/category';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ExitGameDialogComponent } from '../exit-game-dialog/exit-game-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-mixed-letters',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './mixed-letters.component.html',
  styleUrl: './mixed-letters.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixedLettersComponent implements OnInit {
  @Input() id?: string; //GameProfile;
  allGames: GameProfile[] = [];
  index = 0; //for showing the curent word
  progressValue = 0; //for incrimet the progrees value
  currentCategory?: Category;
  usersAnser: string = '';
  clickButton: boolean = true;
  startPlace = 1; //to show number of words in category
  endPlace = 1; //to show how many words left in category
  textOfSuccessOrFail: string = ''; //to show the user if got right or rong answer
  textOfButton: string = '';
  anser = ['']; //dialog parameter
  goodAnswer = 0;
  badAnswer = 0;
  summery: number[] = []; //array of the users anser and category id
  wordStatus: number[] = []; //array of the word status if user anser correct or not
  points = 0; //how many points for each good answer
  coins = 0; //the number of coins the user got
  sw = ''; //the word that shuffeld
  randomWordArray: TranslatedWord[] = []; //for keeping the new order of words that random
  randomOrigenWord = ''; //for keeping the random origen word from category
  randomTargetWord = ''; //for keeping the random target word from category
  randomNumber = -1;
  isFullyLoaded = false;

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
            this.randomArray();
            this.sw = this.currentCategory.words[this.index].origin //for the first word need to show for user
              .split('')
              .sort(() => Math.random() - 0.5)
              .join('')
              .toUpperCase();
            if (
              this.sw ===
              this.currentCategory.words[this.index].origin.toUpperCase()
            ) {
              //for not geting the order of the corect word after shuffled
              this.sw = this.currentCategory.words[this.index].origin
                .split('')
                .sort(() => Math.random() - 0.5)
                .join('')
                .toUpperCase();
            }
          }
          this.isFullyLoaded = true;
        });
    }
  }
  randomArray() {
    //randow new order of word array in every new game
    if (this.currentCategory != undefined) {
      while (this.randomWordArray.length < this.currentCategory.words.length) {
        this.randomNumber = Math.floor(
          Math.random() * this.currentCategory.words.length
        );
        this.randomOrigenWord =
          this.currentCategory.words[this.randomNumber].origin;
        this.randomTargetWord =
          this.currentCategory.words[this.randomNumber].target;
        const existingWord = this.randomWordArray.find(
          (word) =>
            word.origin === this.randomOrigenWord &&
            word.target === this.randomTargetWord
        );
        if (!existingWord) {
          this.randomWordArray.push(
            new TranslatedWord(this.randomOrigenWord, this.randomTargetWord)
          );
        }
      }
      this.currentCategory.words = this.randomWordArray;
    }
  }
  shuffleWord() {
    //get shuffeled word and do preperetion for next word after click
    if (this.currentCategory != undefined) {
      const characters =
        this.currentCategory.words[this.index].origin.split('');
      this.sw = characters
        ?.sort(() => Math.random() - 0.5)
        .join('')
        .toUpperCase();
      if (
        this.sw === this.currentCategory.words[this.index].origin.toUpperCase()
      ) {
        //for not geting the order of the corect word after shuffled
        this.sw = this.shuffleWord().toUpperCase();
      }
      return this.sw;
    }
    return '';
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

  routToSummery() {
    console.log(this.summery);
    this.router.navigate(['summery/' + this.id], {
      queryParams: {
        summery: encodeURIComponent(JSON.stringify(this.summery)),
        wordStatus: encodeURIComponent(JSON.stringify(this.wordStatus)),
        wordsNewArray: encodeURIComponent(
          JSON.stringify(this.currentCategory?.words)
        ),
        gameID:2,
      },
    });
  }
}

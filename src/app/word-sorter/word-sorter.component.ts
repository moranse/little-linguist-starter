import { Category } from '../../shared/model/category';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CategoriesService } from '../services/categories.service';
import { TranslatedWord } from '../../shared/model/translated-word';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { ExitGameDialogComponent } from '../exit-game-dialog/exit-game-dialog.component';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SuccessOrFailDialogComponent } from '../success-or-fail-dialog/success-or-fail-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-word-sorter',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './word-sorter.component.html',
  styleUrl: './word-sorter.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordSorterComponent implements OnInit {
  @Input() id?: string | undefined;
  currentCategory?: Category | undefined;
  chosenCategoryWords: TranslatedWord[] = [];
  allCategorysWords: TranslatedWord[] = [];
  randomCatego?: Category;
  number = -1;
  gameEnWordsArray: string[] = [];
  index = 0; //for showing the curent word
  progressValue = 0; //for incrimet the progrees value
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
  combArray: TranslatedWord[] = [];
  randomWordArray: TranslatedWord[] = []; //for keeping the new order of words that random
  randomOrigenWord = ''; //for keeping the random origen word from category
  randomTargetWord = ''; //for keeping the random target word from category
  randomNumber = -1;
  wordToShow = '';
  shortCatego: TranslatedWord[] = []; //shorter the array to 3 words
  shortRandomCateg: TranslatedWord[] = []; //shorter the array to 3 words
  isFullyLoaded = false;

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.id != undefined) {
      this.categoriesService
        .get(this.id)
        .then((result: Category | undefined) => {
          this.currentCategory = result;
          if (this.currentCategory?.words != undefined) {
            if (this.currentCategory.words.length < 3) {
              console.log(
                'this category have less the 3 words, if i add time i would open dialog to informe the user'
              );
            }

            this.categoriesService
              .list()
              .then((result: Category[] | undefined) => {
                if (result != undefined) {
                  this.randomCategory(result); //get random category from category list

                  this.randomArray(); //combin the 2 categorys and random words inside
                  this.wordToShow = this.randomWordArray[this.index].origin;
                  // this.summery.push(this.id);
                  const stepValue = 100 / this.combArray.length;
                  this.progressValue = stepValue;
                  // this.endPlace = this.combArray.length;
                  this.endPlace = this.randomWordArray.length;
                  this.isFullyLoaded = true;
                }
              });
          }
        }); //get the chosen category
    }
  }

  randomCategory(result: Category[]) {
    //get random category from category list

    const number = Math.floor(Math.random() * result.length); // for getting random number within the range of category list
    this.randomCatego = result[number];
    console.log('the random category is: ' + this.randomCatego.name);
    if (this.id != undefined && this.randomCatego != undefined) {
      console.log('not undefined');
      if (this.randomCatego?.words.length < 3) {
        //for not getting categorys withe less then 3 words
        this.randomCategory(result);
      }
      if (this.randomCatego.id === this.id) {
        // Check if the chosen random category is the same as the current one
        console.log('generate random category agen');
        this.randomCategory(result);
      }
    }
  }

  randomArray() {
    //combin the 2 categorys and random new order of word array in every new game
    if (
      this.currentCategory?.words != undefined &&
      this.randomCatego?.words != undefined
    ) {
      this.shortCatego = this.currentCategory.words;
      for (let i = this.shortCatego.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.shortCatego[i], this.shortCatego[j]] = [
          this.shortCatego[j],
          this.shortCatego[i],
        ];
      }
      this.shortCatego = this.shortCatego.slice(0, 3);
      this.shortRandomCateg = this.randomCatego.words;
      for (let i = this.shortRandomCateg.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.shortRandomCateg[i], this.shortRandomCateg[j]] = [
          this.shortRandomCateg[j],
          this.shortRandomCateg[i],
        ];
      }
      this.shortRandomCateg = this.shortRandomCateg.slice(0, 3);
      this.combArray.push(...this.shortCatego, ...this.shortRandomCateg);
      this.randomWordArray = [...this.combArray];
      for (let i = this.randomWordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.randomWordArray[i], this.randomWordArray[j]] = [
          this.randomWordArray[j],
          this.randomWordArray[i],
        ];
      }
    }
  }

  isItLastWord() {
    //calculate number of words im category
    if (this.randomWordArray.length != undefined) {
      //for handeling the undefined use case

      if (this.startPlace == this.randomWordArray.length) {
        console.log('after finishing all words');
        this.summery.push(this.goodAnswer); //add the finael rezultes of the users answer to summery arry
        console.log(this.summery);
        this.summery.push(this.badAnswer); //add the finael rezultes of the users answer to summery arry
        this.routToSummery();
      }
    }
  }

  checkIfInCategory() {
    if (this.currentCategory?.words != undefined) {
      const existingWord = this.currentCategory.words.findIndex(
        (word) => word.origin === this.randomWordArray[this.index].origin
      );
      console.log('rando word: ' + this.randomWordArray[this.index].origin);
      if (existingWord > -1) {
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
      this.getNextWordToPlay();
    }
  }

  checkIfNotInCategory() {
    if (this.currentCategory?.words != undefined) {
      const existingWord = this.currentCategory.words.findIndex(
        (word) => word.origin === this.randomWordArray[this.index].origin
      );
      console.log('rando word: ' + this.randomWordArray[this.index].origin);
      if (existingWord === -1) {
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
      this.getNextWordToPlay();
    }
  }

  getNextWordToPlay() {
    //for showing the next word
    this.points = Math.floor(100 / this.randomWordArray.length); //how many points for each good answer
    this.isItLastWord();
    this.index++;
    this.wordToShow = this.randomWordArray[this.index].origin;
    this.startPlace++;
    const stepValue = 100 / this.combArray.length;
    this.progressValue += stepValue;
    console.log(this.wordToShow);
    this.startPlace = this.index + 1;
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

  exitGame() {
    //for closing dialog
    const dialogRef = this.dialogService.open(ExitGameDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('add routing to choose game');
      }
    });
  }

  routToSummery() {
    console.log(this.summery);
    this.router.navigate(['summery/' + this.id], {
      queryParams: {
        summery: encodeURIComponent(JSON.stringify(this.summery)),
        wordStatus: encodeURIComponent(JSON.stringify(this.wordStatus)),
        wordsNewArray: encodeURIComponent(JSON.stringify(this.randomWordArray)),
        gameID:3,
      },
    });
  }
}

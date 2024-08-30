import { Category } from '../../shared/model/category';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
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
  ],
  templateUrl: './word-sorter.component.html',
  styleUrl: './word-sorter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.id != undefined) {
      this.currentCategory = this.categoriesService.get(parseInt(this.id)); //get the chosen category
      if (this.currentCategory?.words != undefined) {
        this.randomCategory(); //get random category from category list
        this.randomArray(); //combin the 2 categorys and random words inside
        this.wordToShow = this.randomWordArray[this.index].origin;
        this.summery.push(parseInt(this.id));
        const stepValue = 100 / this.combArray.length;
        this.progressValue = stepValue;
        this.endPlace = this.combArray.length;
      }
    }
  }

  randomCategory() {
    //get random category from category list
    const categoriesLength = this.categoriesService.list().length;
    this.number = Math.floor(Math.random() * categoriesLength); // for getting random number within the range of category list
    this.randomCatego = this.categoriesService.get(this.number);
    console.log(
      'the random category is: ' + this.categoriesService.get(this.number)?.name
    );
    if (this.id != undefined) {
      console.log('not undefined');
      if (this.number === parseInt(this.id)) {
        // Check if the chosen random category is the same as the current one
        console.log('generate random category agen');
        this.randomCategory();
      }
    }
  }

  randomArray() {
    //combin the 2 categorys and random new order of word array in every new game
    if (
      this.currentCategory?.words != undefined &&
      this.randomCatego?.words != undefined
    ) {
      this.combArray.push(
        ...this.currentCategory.words,
        ...this.randomCatego.words
      );
      this.randomWordArray = [...this.combArray];
      for (let i = this.randomWordArray.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.randomWordArray[i], this.randomWordArray[j]] = [
          this.randomWordArray[j],
          this.randomWordArray[i],
        ];
      }
    }
  }

  howManyWordsLeft() {
    //calculate number of words im category
    if (this.randomWordArray.length != undefined) {
      //for handeling the undefined use case
      this.startPlace = this.index+1;
      this.endPlace = this.randomWordArray.length;
    }
  }

  checkIfInCategory() {
    if (this.currentCategory?.words != undefined) {
      const existingWord = this.currentCategory.words.findIndex(
        (word) => word.origin === this.randomWordArray[this.index].origin
      );console.log("rando word: "+this.randomWordArray[this.index].origin+' index is: '+existingWord);
      if (existingWord>-1) {
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
      console.log("rando word: "+this.randomWordArray[this.index].origin+' index is: '+existingWord);
      if (existingWord===-1) {
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
    this.index++;
    this.wordToShow = this.randomWordArray[this.index].origin;
    this.startPlace++;
    const stepValue = 100 / this.combArray.length;
    this.progressValue += stepValue;
    this.howManyWordsLeft();
    console.log(this.wordToShow);
    if (this.startPlace == this.randomWordArray.length) {
      console.log('after finishing all words');
      this.summery.push(this.goodAnswer); //add the finael rezultes of the users answer to summery arry
      console.log(this.summery);
      this.summery.push(this.badAnswer); //add the finael rezultes of the users answer to summery arry
      this.routToSummery();
    }
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
    this.router.navigate(['summery/' + this.summery[0]], {
      queryParams: {
        summery: encodeURIComponent(JSON.stringify(this.summery)),
        wordStatus: encodeURIComponent(JSON.stringify(this.wordStatus)),
        wordsNewArray: encodeURIComponent(JSON.stringify(this.randomWordArray)),
      },
    });
  }

}

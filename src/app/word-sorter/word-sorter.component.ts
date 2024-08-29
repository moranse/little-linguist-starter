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
  currentCategory?: Category;
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
  sw = '';

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.id != undefined) {
      this.currentCategory = this.categoriesService.get(parseInt(this.id)); //get the chosen category
      if (this.currentCategory?.words != undefined) {
        this.chosenCategoryWords = this.currentCategory?.words;
        console.log(
          'current category is:' +
            this.currentCategory?.name +
            ' and chosen words array from category is: ' +
            this.chosenCategoryWords
        );
        this.summery.push(parseInt(this.id));
        const stepValue = 100 / this.currentCategory.words.length;
        this.progressValue = stepValue;
        this.endPlace = this.currentCategory?.words.length;
      }
    }
  }

  randomCategory() {
    const categoriesLength = this.categoriesService.list().length;
    this.number = Math.floor(Math.random() * categoriesLength); // for getting random number within the range of category list
    console.log(
      'the random category is: ' + this.categoriesService.get(this.number)?.name
    );
    if (this.id != undefined) {
      console.log('not undefined');
      if (this.number === parseInt(this.id)) {
        // Check if the chosen random category is the same as the current one
        console.log('generate random category agen');
        this.randomCategory();
      } else {
        this.randomCatego = this.categoriesService.get(this.number);
        if (this.randomCatego != undefined) {
          console.log(
            'the random category name is: ' +
              this.randomCatego.name +
              ' .and the words arry is: ' +
              this.randomCatego.words
          );
        }
      }
    }
    this.getRandomWords();
  }

  getRandomWords() {
    //הפונקציה לא עובדת טוב. צריך שנשמור למערך רק את המילה באנגלית
    //כאן נרצה להגריל מילים מהקטגטריה הנבחרת
    //כאן נרצה להוסיף מילים מוגרלות גם מהקטגוריה המוגרלת
    //לשנות כך שיוגרלו רק 3 מילים מכל קטגוריה
    for (let i = this.chosenCategoryWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [
        this.gameEnWordsArray[i],
        (this.gameEnWordsArray[j] = this.chosenCategoryWords[j].origin),
        this.chosenCategoryWords[i].origin,
      ];
    }
    console.log(this.gameEnWordsArray);
    return this.gameEnWordsArray;
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
}

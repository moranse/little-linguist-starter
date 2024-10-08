//import { categories } from './../../shared/data/categories';
//import { CategoriesService } from './../services/categories.service';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { Category } from '../../shared/model/category';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, formatDate } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TriviaComponent } from '../trivia/trivia.component';
import { MixedLettersComponent } from '../mixed-letters/mixed-letters.component';
import { WordSorterComponent } from '../word-sorter/word-sorter.component';

@Component({
  selector: 'app-choose-game-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    RouterModule,
    TriviaComponent,
    MixedLettersComponent,
    WordSorterComponent,
  ],
  templateUrl: './choose-game-dialog.component.html',
  styleUrl: './choose-game-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseGameDialogComponent implements OnInit {
  selected: string = '';
  allCategories: Category[] = [];

  constructor(
    public dialogRef: MatDialogRef<ChooseGameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    //the type is any because geting 2 types - category and game profile
    this.allCategories = data.allCategories;
  }

  ngOnInit(): void {
    console.log(this.allCategories);
  }

  getCategoryByID(ID: string): Category | undefined {
    //formated the category id to category name
    const cate = this.allCategories.find((item) => item.id === ID);
    return cate;
  }
  getDateForCategory(ID: string): string {
    //formated the category date
    let formattedDate = '';
    const formated = this.allCategories.find((item) => item.id === ID);
    if (formated != undefined) {
      formattedDate = formatDate(
        formated.lastUpdateDate,
        'yyyy-MM-dd',
        'en-US'
      );
    }
    return formattedDate;
  }

  closeDialog() {
    this.dialogRef.close(this.selected);
  }
}

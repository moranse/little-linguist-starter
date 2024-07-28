//import { categories } from './../../shared/data/categories';
import { CategoriesService } from './../services/categories.service';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../shared/model/category';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'app-choose-game-dialog',
  standalone: true,
  imports: [MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose, MatInputModule, FormsModule, MatFormFieldModule, MatSelectModule, CommonModule
  ],
  templateUrl: './choose-game-dialog.component.html',
  styleUrl: './choose-game-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseGameDialogComponent implements OnInit {
  selected: number = 99;
  allCategories: Category[] = [];

  constructor(public dialogRef: MatDialogRef<ChooseGameDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.allCategories = data.allCategories;
  }

  ngOnInit(): void {
    console.log(this.allCategories);
  }

  getCategoryByID(ID: number): Category | undefined {//formated the category id to category name
    let cate = this.allCategories.find(item => item.id === ID);
    return cate;
  }
  getCategoryByID2(ID: number): string {//formated the category date
    let formattedDate = "";
    let something = this.allCategories.find(item => item.id === ID);
    if (something != undefined) {
      formattedDate = formatDate(something.lastUpdateDate, 'yyyy-MM-dd', 'en-US');
    }

    return formattedDate;
  }
}

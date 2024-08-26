import { CategoriesService } from './../services/categories.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Language } from '../../shared/model/language';
import { Category } from '../../shared/model/category';
import { FormsModule, NgModelGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslatedWord } from '../../shared/model/translated-word';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CategoryFormComponent implements OnInit { 
  currentCategory = new Category(0,"", Language.English, Language.Hebrew);
  displayedColumns: string[] = ["Origin", "Target", "Actions"];

  @Input()
  id? : string;

  @ViewChild('wordsGroup') wordsGroup? : NgModelGroup;

  constructor(private categoriesService : CategoriesService,
    private router : Router){}

  ngOnInit(): void {
    if (this.id) {
      const categoryData = this.categoriesService.get(parseInt(this.id)); 

      if (categoryData) {
        this.currentCategory = categoryData;
      }
    }
  }

  addWord() {
    this.currentCategory.words = 
      [...this.currentCategory.words, 
        new TranslatedWord("", "")];
 }

  deleteWord(index : number) {
    const extendedWordsList = Array.from(this.currentCategory.words);
    extendedWordsList.splice(index, 1)
    this.currentCategory.words = extendedWordsList;
    this.wordsGroup!.control.markAsDirty();
  }

  saveCategory() {
    if (this.id) {
      this.categoriesService.update(this.currentCategory);
    } else {
      this.categoriesService.add(this.currentCategory);
    }

    this.router.navigate(['']);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { RouterModule } from '@angular/router';
import { Category } from '../../shared/model/category';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslatedWord } from '../../shared/model/translated-word';

@Component({
  selector: 'app-game-summery',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './game-summery.component.html',
  styleUrl: './game-summery.component.css',
})
export class GameSummeryComponent implements OnInit {
  @Input() summery?: string;
  @Input() wordStatus?: string;
  summeryArray: number[] = [];
  wordStatusArray: number[] = [];
  id = 0;
  goodAnswer = 0;
  badAnswer = 0;
  currentCategory?: Category;
  grade = 100;
  points = 0;
  randomWordArray: TranslatedWord[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.summeryArray = JSON.parse(decodeURIComponent(params['summery']));
      this.id = this.summeryArray[0];
      this.goodAnswer = this.summeryArray[1];
      this.badAnswer = this.summeryArray[2];

      this.wordStatusArray = JSON.parse(
        decodeURIComponent(params['wordStatus'])
      );

      this.randomWordArray = JSON.parse(
        decodeURIComponent(params['wordsNewArray'])
      );

      console.log(
        'number of good answers: ' +
          this.goodAnswer +
          ' nuber of bad answers: ' +
          this.badAnswer
      );
      this.currentCategory = this.categoriesService.get(this.id);
      console.log(
        'for showing the category name to user, The category name is: ' +
          this.currentCategory?.name
      );
      this.points = Math.floor(this.grade / this.randomWordArray.length); //how many points for each good answer
      if (!this.wordStatusArray.includes(0)) {
        this.grade;
        console.log(this.grade);
      } else {
        this.grade = this.points * this.goodAnswer;
      }
    });
  }

  getGrade() {
    console.log(this.grade);
    return this.grade;
  }

  wordsTarget(index: number): string | undefined {
    if (
      this.randomWordArray &&
      index >= 0 &&
      index < this.randomWordArray.length
    ) {
      return this.randomWordArray[index].target;
    }
    return undefined;
  }

  wordsOrigen(index: number): string | undefined {
    if (
      this.randomWordArray &&
      index >= 0 &&
      index < this.randomWordArray.length
    ) {
      return this.randomWordArray[index].origin;
    }
    return undefined;
  }
}

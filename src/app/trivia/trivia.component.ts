import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
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

@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule, MatProgressBarModule],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TriviaComponent implements OnInit {
  @Input() id?: any;
  //  @Input() id?: GameProfile;
  allGames: GameProfile[] = [];
  currentCategory?: Category;
  progressValue = 0; //for incrimet the progrees value
  startPlace = 1; //to show number of words in category
  endPlace = 1; //to show how many words left in category

  constructor(
    private gamesService: GamesService,
    private categoriesService: CategoriesService,
    private dialogService: MatDialog
  ) {}

  ngOnInit(): void {
    this.allGames = this.gamesService.list();
    this.categoriesService.get(this.id).then((result: Category | undefined) => {
      this.currentCategory = result;
      if (this.currentCategory?.words != undefined) {
        console.log('current category is:' + this.currentCategory?.name);
        this.endPlace = this.currentCategory?.words.length;
        this.temperoryfuncForShowingPrograsBar();
      }
    }); //get the chosen category
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

  temperoryfuncForShowingPrograsBar() {
    if (this.currentCategory?.words != undefined) {
      //this.startPlace++;
      const stepValue = 100 / this.currentCategory?.words.length;
      this.progressValue += stepValue;
    }
  }
}

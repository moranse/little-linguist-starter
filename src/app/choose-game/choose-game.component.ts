import { CategoriesService } from './../services/categories.service';
import { GamesService } from './../services/games.service';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameProfile } from '../../shared/model/gameProfile';
import { CommonModule } from '@angular/common';
import { ChooseGameDialogComponent } from '../choose-game-dialog/choose-game-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { Category } from '../../shared/model/category';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-choose-game',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './choose-game.component.html',
  styleUrl: './choose-game.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseGameComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  allGames: GameProfile[] = [];
  allCategories: Category[] = [];
  dialogService: any;
  category: any;
  isFullyLoaded: boolean = false;

  constructor(
    private gamesService: GamesService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {
    this.isFullyLoaded = false;
  }

  ngOnInit(): void {
    this.allGames = this.gamesService.list();
    this.categoriesService.list().then((result: Category[]) => {
      this.allCategories = result;
      this.isFullyLoaded = true;
    });
  }

  chooseCategory(game: GameProfile) {
    console.log('game: ' + game.name + ' categories: ' + this.allCategories);

    const dialogRef = this.dialog?.open(ChooseGameDialogComponent, {
      data: { allCategories: this.allCategories },
      height: '330px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((selectedCategory) => {
      console.log(
        'The dialog was closed: ' + selectedCategory + ' game id:  ' + game.id
      );
      if (selectedCategory != '') {
        selectedCategory;
        this.router.navigate(['/' + game.gameURL, selectedCategory]);
      }
    });
  }
}

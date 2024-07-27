import { CategoriesService } from './../services/categories.service';
import { GamesService } from './../services/games.service';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameProfile } from '../../shared/model/gameProfile';
import { CommonModule } from '@angular/common';
import { ChooseGameDialogComponent } from '../choose-game-dialog/choose-game-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../shared/model/category';

@Component({
  selector: 'app-choose-game',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './choose-game.component.html',
  styleUrl: './choose-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseGameComponent implements OnInit {

  allGames: GameProfile[] = [];
  allCategories: Category[] = [];
  dialogService: any;
  //categoriesService: any;
  category: any;

  constructor(private gamesService: GamesService, private dialog: MatDialog, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.allGames = this.gamesService.list();
    this.allCategories=this.categoriesService.list();
  }

  chooseCategory(allCategories: number, name: string) {
    let dialogRef = this.dialogService.open(ChooseGameDialogComponent, { data: name });

    dialogRef.afterClosed().subscribe((result: Category[]) => {
      if (result) {
        //this.categoriesService = this.categoriesService.list();
      }
    });
  }
}

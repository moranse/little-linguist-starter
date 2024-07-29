import { CategoriesService } from './../services/categories.service';
import { GamesService } from './../services/games.service';
import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameProfile } from '../../shared/model/gameProfile';
import { CommonModule } from '@angular/common';
import { ChooseGameDialogComponent } from '../choose-game-dialog/choose-game-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { Category } from '../../shared/model/category';
import { MatDialog, MatDialogActions,  MatDialogClose,  MatDialogContent,  MatDialogRef,  MatDialogTitle,} from '@angular/material/dialog';


@Component({
  selector: 'app-choose-game',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './choose-game.component.html',
  styleUrl: './choose-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseGameComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  allGames: GameProfile[] = [];
  allCategories: Category[] = [];
  dialogService: any;
  category: any;

  constructor(private gamesService: GamesService,private categoriesService: CategoriesService,private router: Router) { }

  ngOnInit(): void {
    this.allGames = this.gamesService.list();
    this.allCategories=this.categoriesService.list();
  }

  chooseCategory(game:GameProfile) {
    console.log("game: "+game.name+" categories: "+this.allCategories);

      let dialogRef = this.dialog.open(ChooseGameDialogComponent, {
      data:{allCategories: this.allCategories},
      height: '330px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(selectedCategory => {
      console.log('The dialog was closed: ' + selectedCategory + " game id:  "+game.id);
      selectedCategory;
        this.router.navigate(['/'+game.gameURL, selectedCategory]);
    });
  }
  
}

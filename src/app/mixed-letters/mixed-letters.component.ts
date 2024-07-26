import { CategoriesService } from './../services/categories.service';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameProfile } from '../../shared/model/gameProfile';
import { GamesService } from '../services/games.service';
import { Category } from '../../shared/model/category';

@Component({
  selector: 'app-mixed-letters',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './mixed-letters.component.html',
  styleUrl: './mixed-letters.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixedLettersComponent implements OnInit {
  @Input() id?:any //GameProfile;
  //id?: any;//for chosing cattegory 
  allGames: GameProfile[] = [];
  currentCategory?: Category;

  constructor(private gamesService: GamesService, private categoriesService: CategoriesService) {

  }

  ngOnInit(): void {

    this.allGames = this.gamesService.list();
    this.currentCategory = this.categoriesService.get(parseInt(this.id));
    console.log("current category is:" + this.currentCategory?.name);
  }

}

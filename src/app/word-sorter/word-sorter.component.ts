import { ChangeDetectionStrategy, Component, Input, numberAttribute, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameProfile } from '../../shared/model/gameProfile';
import { GamesService } from '../services/games.service';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../../shared/model/category';

@Component({
  selector: 'app-word-sorter',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './word-sorter.component.html',
  styleUrl: './word-sorter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordSorterComponent implements OnInit {
  @Input() id?: any;
  //  @Input() id?: GameProfile;
  allGames: GameProfile[] = [];
  currentCategory?: Category;

  constructor(private gamesService: GamesService, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.allGames = this.gamesService.list();
    this.currentCategory = this.categoriesService.get(parseInt(this.id));
    console.log("current category is:" + this.currentCategory?.name);
  }
}

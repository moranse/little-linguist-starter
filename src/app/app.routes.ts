import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HelperComponent } from './helper/helper.component';
import { ChooseGameComponent } from './choose-game/choose-game.component';
import { WordSorterComponent } from './word-sorter/word-sorter.component';
import { MixedLettersComponent } from './mixed-letters/mixed-letters.component';
import { TriviaComponent } from './trivia/trivia.component';
import { GameSummeryComponent } from './game-summery/game-summery.component';
import { MemoryGameComponent } from './memory-game/memory-game.component';

export const routes: Routes = [
  { path: 'categorieslist', component: CategoriesListComponent },
  { path: 'category/:id', component: CategoryFormComponent },
  { path: 'newcategory', component: CategoryFormComponent },
  { path: '', component: DashbordComponent },
  { path: 'help', component: HelperComponent },
  { path: 'choosegame', component: ChooseGameComponent },
  { path: 'wordsorter/:id', component: WordSorterComponent },
  { path: 'mixed/:id', component: MixedLettersComponent },
  { path: 'trivia/:id', component: TriviaComponent },
  { path: 'summery/:id', component: GameSummeryComponent },
  { path: 'memory/:id', component: MemoryGameComponent },
];

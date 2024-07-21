import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HelperComponent } from './helper/helper.component';
import { ChooseGameComponent } from './choose-game/choose-game.component';
import { WordSorterComponent } from './word-sorter/word-sorter.component';
import { MixedLettersComponent } from './mixed-letters/mixed-letters.component';
import { TriviaComponent } from './trivia/trivia.component';


export const routes: Routes = [
    {path: "categorieslist", component: CategoriesListComponent},
    {path: "category/:id", component: CategoryFormComponent},
    {path: "newcategory", component: CategoryFormComponent},
    {path: "", component: DashbordComponent},
    {path: "help", component: HelperComponent},
    {path: "choosegame", component: ChooseGameComponent},
    {path: "wordSorter/:category", component: WordSorterComponent},
    {path: "mixedLetters/:category", component: MixedLettersComponent},
    {path: "trivia/:category", component: TriviaComponent}
];

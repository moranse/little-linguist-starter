import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HelperComponent } from './helper/helper.component';
import { ChooseGameComponent } from './choose-game/choose-game.component';
import { WordSorterComponent } from './word-sorter/word-sorter.component';
import { MixedLettersComponent } from './mixed-letters/mixed-letters.component';


export const routes: Routes = [
    {path: "", component: CategoriesListComponent},
    {path: "category/:id", component: CategoryFormComponent},
    {path: "newcategory", component: CategoryFormComponent},
    {path: "dashbord", component: DashbordComponent},
    {path: "help", component: HelperComponent},
    {path: "choosegame", component: ChooseGameComponent},
    {path: "wordSorter", component: WordSorterComponent},
    {path: "mixedLetters", component: MixedLettersComponent}
];

//import { categories } from './../../shared/data/categories';
import { CategoriesService } from './../services/categories.service';
import { ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { Category } from '../../shared/model/category';

@Component({
  selector: 'app-choose-game-dialog',
  standalone: true,
  imports: [MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './choose-game-dialog.component.html',
  styleUrl: './choose-game-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseGameDialogComponent implements OnInit {
  allCategories:Category[]=[];

  constructor(@Inject(MAT_DIALOG_DATA) public categoryName : string, private categoriesService:CategoriesService){}

  ngOnInit(): void {
    this.allCategories= this.categoriesService.list();
    console.log(this.allCategories);
  }

}

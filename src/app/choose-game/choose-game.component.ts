import { GamesService } from './../services/games.service';
import { Component, ChangeDetectionStrategy, OnInit, numberAttribute, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { GameProfile } from '../../shared/model/gameProfile';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choose-game',
  standalone: true,
  imports: [MatCardModule,CommonModule],
  templateUrl: './choose-game.component.html',
  styleUrl: './choose-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseGameComponent implements OnInit {

  allGames:GameProfile[]=[];
  
    constructor(private gamesService:GamesService){}
    
    ngOnInit(): void {
      this.allGames= this.gamesService.list();
      
    }
}

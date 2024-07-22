import { ChangeDetectionStrategy, Component, Input,numberAttribute, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { GameProfile } from '../../shared/model/gameProfile';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-word-sorter',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './word-sorter.component.html',
  styleUrl: './word-sorter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordSorterComponent implements OnInit{
@Input({alias:'id', transform: numberAttribute })game?:GameProfile;

allGames:GameProfile[]=[];

  constructor(private gamesService:GamesService){}
  
  ngOnInit(): void {
    this.allGames= this.gamesService.list();
    
  }
}

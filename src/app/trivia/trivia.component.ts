import { ChangeDetectionStrategy, Component ,Input, numberAttribute, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { GameProfile } from '../../shared/model/gameProfile';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TriviaComponent implements OnInit{
  @Input({alias:'id', transform: numberAttribute })game?:GameProfile;
  allGames:GameProfile[]=[];

  constructor(private gamesService:GamesService){}
  
  ngOnInit(): void {
    this.allGames= this.gamesService.list();
    
  }
}

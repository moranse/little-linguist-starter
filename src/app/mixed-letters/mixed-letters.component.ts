import { ChangeDetectionStrategy, Component,Input, numberAttribute, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { GameProfile } from '../../shared/model/gameProfile';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-mixed-letters',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './mixed-letters.component.html',
  styleUrl: './mixed-letters.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixedLettersComponent implements OnInit{
  @Input({alias:'id', transform: numberAttribute })game?:GameProfile;
  allGames:GameProfile[]=[];

  constructor(private gamesService:GamesService){}
  
  ngOnInit(): void {
    this.allGames= this.gamesService.list();
    
  }

}

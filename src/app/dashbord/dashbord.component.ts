import { Component,ChangeDetectionStrategy } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashbordComponent {

}

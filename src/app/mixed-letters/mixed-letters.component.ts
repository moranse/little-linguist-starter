import { Component,Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-mixed-letters',
  standalone: true,
  imports: [],
  templateUrl: './mixed-letters.component.html',
  styleUrl: './mixed-letters.component.css'
})
export class MixedLettersComponent {
  @Input({alias:'id', transform: numberAttribute })category:any;

}

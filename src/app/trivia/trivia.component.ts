import { Component ,Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.css'
})
export class TriviaComponent {
  @Input({alias:'id', transform: numberAttribute })category:any;

}

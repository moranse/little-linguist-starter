import { Component, Input,numberAttribute} from '@angular/core';

@Component({
  selector: 'app-word-sorter',
  standalone: true,
  imports: [],
  templateUrl: './word-sorter.component.html',
  styleUrl: './word-sorter.component.css'
})
export class WordSorterComponent {
@Input({alias:'id', transform: numberAttribute })category:any;
}

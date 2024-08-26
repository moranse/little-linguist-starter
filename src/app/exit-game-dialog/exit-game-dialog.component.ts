import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-exit-game-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './exit-game-dialog.component.html',
  styleUrl: './exit-game-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExitGameDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public anser: boolean) {}
}

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MixedLettersComponent } from '../mixed-letters/mixed-letters.component';

@Component({
  selector: 'app-success-or-fail-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    CommonModule,
    RouterModule,
    MixedLettersComponent,
  ],
  templateUrl: './success-or-fail-dialog.component.html',
  styleUrl: './success-or-fail-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessOrFailDialogComponent {
  textOfSuccessOrFail = '';
  constructor(
    public dialogRef: MatDialogRef<SuccessOrFailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.textOfSuccessOrFail = data;
  }
}

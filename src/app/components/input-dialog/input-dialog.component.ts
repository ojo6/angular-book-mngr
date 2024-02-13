import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface inputDialogData {
  authorName: string;
}

@Component({
  selector: 'app-input-author-dialog',
  templateUrl: './input-dialog.component.html',
})
export class InputDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<InputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: inputDialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

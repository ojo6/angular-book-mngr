import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthor } from '../../interfaces/author.interface';
import { BookStorageService } from '../../services/book-storage.service';
import { needConfirmation } from '../../confirm-dialog.decorator';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputDialogComponent } from '../input-dialog/input-dialog.component';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css',
})
export class AuthorListComponent {
  authorsBooks: { [Name: string]: number[] } = {};
  authorsTableData: IAuthor[] = [];
  constructor(
    private bookService: BookStorageService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadAuthors();
  }

  displayedColumns: string[] = [
    'position',
    'name',
    'totalNumberOfBooks',
    'edit',
    'delete',
  ];

  private loadAuthors() {
    const authorsData = this.bookService.getAuthorsBooks;
    this.authorsTableData = [];
    for (const [author, books] of Object.entries(authorsData)) {
      this.authorsTableData.push({ name: author, bookIds: books });
    }
  }

  @needConfirmation({
    title: 'Remove author',
    message:
      'Are you sure you want to remove this author from all of the books?',
  })
  protected removeAuthor(author: IAuthor) {
    this.bookService.removeAuthor(author);
    this.loadAuthors();
  }

  openEditDialog(author: IAuthor): void {
    const dialogRef = this.dialog.open(InputDialogComponent, {
      data: { authorName: author.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result !== author.name) {
        this.bookService.updateAuthorName(author, result);
      }
      this.loadAuthors();
    });
  }
}

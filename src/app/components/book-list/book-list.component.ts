import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { needConfirmation } from '../../confirm-dialog.decorator';
import { IBook } from '../../interfaces/book-interface';
import { BookStorageService } from '../../services/book-storage.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogCloseOptions } from '@angular/cdk/dialog';
import { ConfirmDialogData } from '../confirm-dialog/confirm-dialog-data';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  books: IBook[] = [];

  constructor(
    private bookService: BookStorageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  displayedColumns: string[] = [
    'position',
    'name',
    'author',
    'rating',
    'printDate',
    'totalNumberOfBooks',
    'view',
    'edit',
    'delete',
  ];

  public getBooks() {
    this.bookService.getBooks().subscribe((book) => {
      this.books.push(book);
    });
  }

  protected goToView(id: number) {
    console.log('clicked on row:', id);
    this.router.navigate(['/view-book/' + id.toString()]);
  }

  protected goToEdit(id: number) {
    this.router.navigate(['/edit-book/' + id.toString()]);
  }

  protected goToAdd() {
    this.router.navigate(['/add-book']);
  }

  protected goToAuthors() {
    this.router.navigate(['/authors']);
  }

  @needConfirmation({
    title: 'Delete book',
    message: 'Are you sure you want to delete this book?',
  })
  protected deleteBookEntry(id: number) {
    console.log('Deleting book', id);
    this.bookService.deleteBook(id);
    this.books = [];
    this.getBooks();
  }
}

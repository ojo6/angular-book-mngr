import { Component } from '@angular/core';
import { IBook } from '../../book-interface';
import { Router } from '@angular/router';
import { needConfirmation } from '../../confirm-dialog.decorator';
import { BookStorageService } from '../../services/book-storage.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  books: IBook[] = [];

  constructor(
    private bookStorageService: BookStorageService,
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
    this.bookStorageService.getBooks().subscribe((book) => {
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

  @needConfirmation()
  protected deleteBookEntry(id: number) {
    console.log('Deleting book', id);
    this.bookStorageService.deleteBook(id);
    this.books = [];
    this.getBooks();
  }
}

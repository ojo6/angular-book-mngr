import { Component } from '@angular/core';
import { IBook } from '../../book-interface';
import { BookStorageService } from '../../services/book-storage.service';
import { Router } from '@angular/router';
import { needConfirmation } from '../../confirm-dialog.decorator';

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
      console.log('MULTIPLE ___ Next:', book);
      this.books.push(book);
    });
  }

  protected goToView(id: string) {
    console.log('clicked on row:', id);
    this.router.navigate(['/view-book/' + id]);
  }

  protected goToEdit(id: string) {
    this.router.navigate(['/edit-book/' + id]);
  }

  goToAdd() {
    this.router.navigate(['/add-book']);
  }

  @needConfirmation()
  protected deleteBookEntry(id: string) {
    console.log('Deleting book', id);
    this.bookStorageService.deleteBook(id);
    this.books = [];
    this.getBooks();
  }
}

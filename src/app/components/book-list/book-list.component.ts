import { Component } from '@angular/core';
import { IBook } from '../../books';
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
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
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

  private getBooks(): void {
    this.books = this.bookStorageService.getBooks();
    console.log('these are the books:', this.books);
  }

  protected goToView(id: any) {
    console.log('clicked on row:', id);
    this.router.navigate(['/view-book/' + id]);
  }

  protected goToEdit(book: IBook) {
    console.log('editing book', book);
  }

  @needConfirmation()
  protected deleteBookEntry(id: string) {
    console.log('Deleting book', id);
    this.bookStorageService.deleteBook(id);
    this.getBooks();
  }
}

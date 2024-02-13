import { CSP_NONCE, Injectable, booleanAttribute } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  concatMap,
  from,
  map,
  of,
  switchMap,
  toArray,
} from 'rxjs';
import { IBook } from '../interfaces/book-interface';
import { BOOKS } from '../mock-books';
import { IAuthor } from '../interfaces/author.interface';

export const STORE_KEY_VALUE: string = 'myBookList';
@Injectable({
  providedIn: 'root',
})
export class BookStorageService {
  private idsSaved: number[] = [];
  protected authorsBooks: { [Name: string]: number[] } = {};

  constructor() {
    this.saveInitialData(); // to have data from the start
    this.setAuthorsBooks();
  }

  public getBooks(): Observable<IBook> {
    return from(this.idsSaved).pipe(concatMap((id) => this.getBook(id)));
  }

  public getBook(id: number): Observable<IBook> {
    const key = id.toString();
    const book: any = localStorage.getItem(key);
    const parsedBook: IBook = JSON.parse(book);
    return of(parsedBook);
  }

  // store individual book
  public saveBook(id: number, value: IBook) {
    if (!this.idsSaved.includes(id)) {
      this.idsSaved.push(id);
    }

    localStorage.setItem(id.toString(), JSON.stringify(value));
  }

  saveBookForm(bookFormData: any, id: number | null): Observable<number> {
    const saveId: number = id ? Number(id) : this.generateId();
    const newBook: IBook = {
      id: saveId,
      name: bookFormData.name,
      description: bookFormData.description,
      author: bookFormData.author,
      rating: bookFormData.rating,
      bookWebsiteUrl: bookFormData.bookWebsiteUrl,
      numberOfPages: bookFormData.numberOfPages,
      printDate: bookFormData.printDate,
      totalNumberOfBooks: bookFormData.totalNumber,
    };
    console.log('earlier:', typeof saveId);
    this.saveBook(saveId, newBook);
    return of(saveId);
  }

  public deleteBook(id: number) {
    console.log('deleting book :', id);
    const key = id.toString();
    localStorage.removeItem(key);
    this.idsSaved = this.idsSaved.filter((ind) => ind !== id);
    console.log('idsSaved aftrer delete', this.idsSaved);
    this.setAuthorsBooks();
  }

  public getAuthors(): Observable<string[]> {
    return this.getBooks().pipe(
      map((book) => book.author),
      toArray(),
      map((authors) => [...new Set(authors)]),
    );
  }

  public setAuthorsBooks() {
    let authorsBooks: { [Name: string]: number[] } = {};
    for (let id of this.idsSaved) {
      const key = id.toString();
      const book: any = localStorage.getItem(key);
      const parsedBook: IBook = JSON.parse(book);

      if (parsedBook.author !== '') {
        // store the book ids for each author, to remove them upon deletion of an author
        authorsBooks[parsedBook.author] = authorsBooks[parsedBook.author]
          ? [...authorsBooks[parsedBook.author], id]
          : [id];
      }
    }
    console.log('setter, ', authorsBooks);
    this.authorsBooks = authorsBooks;
  }

  get getAuthorsBooks() {
    return this.authorsBooks;
  }

  private generateId(): number {
    return Math.floor(Math.random() * 80) + 20;
  }

  public removeAuthor(author: IAuthor) {
    for (let id of author.bookIds) {
      this.clearBookAuthor(id);
    }
    this.setAuthorsBooks();
  }

  private clearBookAuthor(id: number) {
    this.getBook(id).subscribe((value) => {
      let book = value;
      book.author = '';
      this.saveBook(book.id, book);
      console.log('selected book to clear', book);
    });
  }

  // some initial "previously saved" books
  private saveInitialData() {
    for (const book of BOOKS) {
      this.saveBook(book.id, book);
    }
  }
}

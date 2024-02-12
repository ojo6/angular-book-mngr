import { Injectable } from '@angular/core';
import { Observable, concatMap, from, map, of, switchMap, toArray } from 'rxjs';
import { IBook } from '../book-interface';
import { BOOKS } from '../mock-books';

export const STORE_KEY_VALUE: string = 'myBookList';
@Injectable({
  providedIn: 'root',
})
export class BookStorageService {
  public indeces: number[] = [];

  constructor() {
    this.saveInitialData(); // to have data from the start
  }

  public getBooks(): Observable<IBook> {
    return from(this.indeces).pipe(concatMap((id) => this.getBook(id)));
  }

  public getBook(id: number): Observable<IBook> {
    const key = id.toString();
    const book: any = localStorage.getItem(key);
    const parsedBook: IBook = JSON.parse(book);
    return of(parsedBook);
  }

  // store individual book
  public saveBook(id: number, value: IBook) {
    const key = id.toString();
    localStorage.setItem(key, JSON.stringify(value));
    this.indeces.push(id);
  }

  saveBookForm(bookFormData: any): Observable<number> {
    const newId: number = this.generateId();
    const newBook: IBook = {
      id: newId,
      name: bookFormData.name,
      description: bookFormData.description,
      author: bookFormData.author,
      rating: bookFormData.rating,
      bookWebsiteUrl: bookFormData.bookWebsiteUrl,
      numberOfPages: bookFormData.numberOfPages,
      printDate: bookFormData.printDate,
      totalNumberOfBooks: bookFormData.totalNumber,
    };

    this.saveBook(newId, newBook);
    return of(newId);
  }

  public deleteBook(id: number) {
    console.log('deleting book :', id);
    const key = id.toString();
    localStorage.removeItem(key);
    this.indeces = this.indeces.filter((ind) => ind !== id);
    console.log('indeces aftrer delete', this.indeces);
  }

  public getAuthors(): Observable<string[]> {
    return this.getBooks().pipe(
      map((book) => book.author),
      toArray(),
      map((authors) => [...new Set(authors)]),
    );
  }

  private generateId(): number {
    return Math.floor(Math.random() * 80) + 20;
  }

  // some initial "previously saved" books
  private saveInitialData() {
    for (const book of BOOKS) {
      this.saveBook(book.id, book);
    }
  }
}

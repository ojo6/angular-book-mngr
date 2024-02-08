import { Injectable, ɵgetUnknownElementStrictMode } from '@angular/core';
import { IBook } from '../books';
import { BOOKS } from '../mock-books';
import { Observable, concatMap, from, of } from 'rxjs';

export const STORE_KEY_VALUE: string = 'myBookList';
@Injectable({
  providedIn: 'root',
})
export class BookStorageService {
  public indeces: string[] = [];

  constructor() {
    this.saveInitialData(); // to have data from the start
  }

  public getBooks(): Observable<IBook> {
    return from(this.indeces).pipe(
      concatMap((id) => this.getBook(id as string)),
    );
  }

  public getBook(id: string): Observable<IBook> {
    const book: any = localStorage.getItem(id);
    const parsedBook: IBook = JSON.parse(book);
    return of(parsedBook);
  }

  // store each individual book
  public storeBook(key: string, value: IBook) {
    localStorage.setItem(key, JSON.stringify(value));
    this.indeces.push(key);
  }

  public deleteBook(key: string) {
    console.log('deleting book :', key);
    localStorage.removeItem(key);
    this.indeces = this.indeces.filter((ind) => ind !== key);
    console.log('indeced after deletion', this.indeces);
  }

  private saveInitialData() {
    for (const book of BOOKS) {
      this.storeBook(book.id, book);
    }
  }
}

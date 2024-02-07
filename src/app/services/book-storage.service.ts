import { Injectable, ɵgetUnknownElementStrictMode } from '@angular/core';
import { IBook } from '../books';
import { BOOKS } from '../mock-books';

export const STORE_KEY_VALUE: string = 'myBookList';
@Injectable({
  providedIn: 'root',
})
export class BookStorageService {
  public indeces: string[] = [];

  constructor() {
    this.saveInitialData(); // to have data from the start
  }

  public getBooks(): IBook[] {
    let books = [];
    for (const i of this.indeces) {
      const objString: any = localStorage.getItem(i);
      if (typeof objString === null) {
        console.error('Book with key ', i, 'is missing from storage!');
      } else {
        books.push(JSON.parse(objString));
      }
    }
    return books;
  }

  getBook(id: string): IBook {
    // TODO catch if not correct type
    const book: any = localStorage.getItem(id);
    return JSON.parse(book);
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

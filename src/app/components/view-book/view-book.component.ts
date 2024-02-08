import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBook } from '../../books';
import { BookStorageService } from '../../services/book-storage.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrl: './view-book.component.css',
})
export class ViewBookComponent implements OnInit {
  book!: IBook;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly bookStorageService: BookStorageService,
  ) {}

  ngOnInit(): void {
    console.log('before getbook call');
    this.getBook();
    console.log('after getbook call');
  }

  public getBook() {
    const id = this.route.snapshot.paramMap.get('id');

    this.bookStorageService.getBook(id as string).subscribe({
      next: (value) => {
        this.book = value;
        console.log('next:', value);
      },
      error: (err) => console.log('error:', err),
      complete: () => console.log('the end'),
    });
    console.log('this is the book,', this.book);
  }
}

// getBook() {
//   // TODO add some type guard?

//   const id = this.route.snapshot.paramMap.get('id');
//   this.bookStorageService.getBook(id as string).subscribe((book) => {
//     this.book = book;
//     console.log('inside subscribe');
//   });
//   console.log('this is the book,', this.book);
// }

// getBook(id: string): Observable<IBook> {
//   // TODO catch if not correct type
//   // const book: any = localStorage.getItem(id);
//   // const parsedBook: IBook = JSON.parse(book);
//   // console.log('inside service of getBook');
//   // return of(parsedBook);
//   return new Observable<IBook>((observer) => {
//     setTimeout(() => {
//       const book: any = localStorage.getItem(id);
//       const parsedBook: IBook = JSON.parse(book);
//       observer.next(parsedBook);
//       // observer.complete();
//       console.log('inside service of getBook');
//     }, 1000);
//   });
// }

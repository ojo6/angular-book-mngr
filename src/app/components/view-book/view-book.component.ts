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
  book: IBook | undefined;
  bookSTR: string = 'nothing';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly bookService: BookStorageService,
  ) {}

  ngOnInit(): void {
    this.getBook();
  }

  getBook() {
    const id = this.route.snapshot.paramMap.get('id');
    this.book = this.bookService.getBook(id as string); // TODO typeguard
    console.log('this is the book,', this.book);
    this.bookSTR = JSON.stringify(this.book);
  }
}

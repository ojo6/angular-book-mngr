import { Component, Input, OnInit } from '@angular/core';
import { IBook } from '../../book-interface';
import { BookStorageService } from '../../services/book-storage.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrl: './view-book.component.css',
})
export class ViewBookComponent implements OnInit {
  book!: IBook;
  @Input() id = '';

  constructor(private readonly bookService: BookStorageService) {}

  ngOnInit(): void {
    if (this.id) {
      this.setSelectedBookId(parseInt(this.id, 10));
    }
  }

  public setSelectedBookId(id: number) {
    this.bookService.getBook(id).subscribe({
      next: (value) => {
        this.book = value;
        console.log('next:', value);
      },
      error: (err) => console.log('error:', err),
    });
  }
}

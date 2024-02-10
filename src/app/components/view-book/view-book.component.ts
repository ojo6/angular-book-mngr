import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private readonly route: ActivatedRoute,
    private readonly bookStorageService: BookStorageService,
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.setSelectedBookId(this.id);
    }
  }

  public setSelectedBookId(id: string) {
    this.bookStorageService.getBook(id).subscribe({
      next: (value) => {
        this.book = value;
        console.log('next:', value);
      },
      error: (err) => console.log('error:', err),
    });
  }
}

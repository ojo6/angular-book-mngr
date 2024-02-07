import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { IBook } from '../../books';
import { BOOKS } from '../../mock-books';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { BookStorageService } from '../../services/book-storage.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  books: IBook[] = [];

  constructor(private bookStorageService: BookStorageService) {}

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
    'edit',
    'delete',
  ];

  getBooks(): void {
    this.books = this.bookStorageService.getBooks();
  }

  protected editBookEntry(book: IBook) {
    console.log('editing book', book);
  }

  // TODO add here confirmation dialog
  protected deleteBookEntry(book: any) {
    console.log('Deleting book', book);
  }
}

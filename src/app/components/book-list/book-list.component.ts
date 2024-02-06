import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { IBook } from '../../books';
import { BOOKS } from '../../mock-books';
import { MatTooltipModule } from '@angular/material/tooltip';

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
  dataSource = BOOKS;
  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'author',
    'rating',
    'bookWebsiteUrl',
    'numberOfPages',
    'printDate',
    'totalNumberOfBooks',
    'edit',
    'delete',
  ];

  protected editBookEntry(book: IBook) {
    console.log('editing book', book);
  }

  //TODO add here confirmation dialog
  protected deleteBookEntry(book: any) {
    console.log('Deleting book', book);
  }
}

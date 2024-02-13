import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthor } from '../../interfaces/author.interface';
import { BookStorageService } from '../../services/book-storage.service';
import { needConfirmation } from '../../confirm-dialog.decorator';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css',
})
export class AuthorListComponent {
  authorsBooks: { [Name: string]: number[] } = {};
  authorsTableData: IAuthor[] = [];

  constructor(private bookService: BookStorageService) {}

  ngOnInit(): void {
    this.loadAuthors();
  }

  displayedColumns: string[] = [
    'position',
    'name',
    'totalNumberOfBooks',
    'edit',
    'delete',
  ];

  private loadAuthors() {
    const authorsData = this.bookService.getAuthorsBooks;
    this.authorsTableData = [];
    for (const [author, books] of Object.entries(authorsData)) {
      this.authorsTableData.push({ name: author, bookIds: books });
    }
    console.log(authorsData);
    console.log(this.authorsTableData);
  }

  @needConfirmation({
    title: 'Remove author',
    message:
      'Are you sure you want to remove this author from all of the books?',
  })
  protected removeAuthor(author: IAuthor) {
    this.bookService.removeAuthor(author);
    this.loadAuthors();
    console.log('table data after delete', this.authorsTableData);
  }

  goToEdit(arg0: any) {
    console.log('Method not implemented.', arg0);
  }
}

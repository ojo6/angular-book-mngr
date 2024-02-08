import { Component } from '@angular/core';
import { BookStorageService } from '../../services/book-storage.service';
import { FormControl,  } from '@angular/forms';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
  constructor(private storageService: BookStorageService) {}

  name = new FormControl('');
}




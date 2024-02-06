import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BookStorageService } from '../../services/book-storage.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
  constructor(private storageService: BookStorageService) {}

  writtenValue: any;
  retrievedValue: any;

  async retrieveLocal() {
    try {
      const data = await this.storageService.fetchValue();
      console.log('retrieved value:', data);
      this.retrievedValue = data;
    } catch (e) {
      console.error('Error', e);
    }
  }

  saveLocal() {
    this.storageService.saveValue(this.writtenValue);
  }
}

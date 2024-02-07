import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private readonly router: Router) {}

  goHome() {
    this.router.navigate(['/book-list']);
  }

  goToAdd() {
    this.router.navigate(['/add-book']);
  }
}

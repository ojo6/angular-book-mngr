import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookFormComponent } from './components/add-book/book-form.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { ViewBookComponent } from './components/view-book/view-book.component';

export const routes: Routes = [
  { path: '', redirectTo: '/book-list', pathMatch: 'full' },
  { path: 'book-list', component: BookListComponent },
  { path: 'add-book', component: BookFormComponent },
  { path: 'edit-book/:id', component: BookFormComponent },
  { path: 'view-book/:id', component: ViewBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

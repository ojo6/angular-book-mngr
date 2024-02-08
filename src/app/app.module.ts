import {
  ENVIRONMENT_INITIALIZER,
  NgModule,
  importProvidersFrom,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { initializeDialogService } from '../main';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { ViewBookComponent } from './components/view-book/view-book.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    ReactiveFormsModule
    // ConfirmDialogComponent,
  ],
  declarations: [
    AppComponent,
    BookListComponent,
    AddBookComponent,
    ViewBookComponent,
    EditBookComponent,
  ],
  providers: [
    importProvidersFrom(MatDialogModule),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useFactory: initializeDialogService,
      deps: [MatDialog],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

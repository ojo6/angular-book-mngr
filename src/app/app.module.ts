import {
  ENVIRONMENT_INITIALIZER,
  NgModule,
  importProvidersFrom,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { EditorModule } from '@tinymce/tinymce-angular';
import { initializeDialogService } from '../main';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookFormComponent } from './components/add-book/book-form.component';
import { BookListComponent } from './components/book-list/book-list.component';
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
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    EditorModule,
    MatRadioModule,
  ],
  declarations: [
    AppComponent,
    BookListComponent,
    BookFormComponent,
    ViewBookComponent,
  ],
  providers: [
    importProvidersFrom(MatDialogModule),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useFactory: initializeDialogService,
      deps: [MatDialog],
      multi: true,
    },
    provideAnimations(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsyncSubject, Observable, Subject, map, startWith } from 'rxjs';
import { BookStorageService } from '../../services/book-storage.service';
import { dateValidator } from '../../validators/date.validator';
import { integerValidator } from '../../validators/positive-integer.validator';
import { urlValidator } from '../../validators/url-format.validator';
import { minWordCount } from '../../validators/min-wordcount.validator';

const MIN_DESCR_WORDCOUNT = 50;
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent implements OnInit {
  // for resetting the red invalid borders of the input fields after submit
  @ViewChild('formElement') bookFormElement!: ElementRef;

  //TODO set accesors
  private editorSubject: Subject<any> = new AsyncSubject();
  maxDate: Date;
  selectedRating: number = 0;
  authors: string[] = [];
  filteredAuthors!: Observable<string[]>;

  // TODO create an empty object ? and reuse the same logic for the edit book
  // book : IBook = {

  // }

  public bookForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    rating: new FormControl(0),
    bookWebsiteUrl: new FormControl<string | null>(null, [urlValidator()]),
    numberOfPages: new FormControl(null, [
      Validators.required,
      Validators.min(1),
    ]),
    totalNumber: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
      integerValidator(),
    ]),
    printDate: new FormControl<Date | null>(null, dateValidator()),
    description: new FormControl<string | null>(
      null,
      Validators.required,
      minWordCount(this.editorSubject, MIN_DESCR_WORDCOUNT),
    ),
  });

  constructor(
    private bookService: BookStorageService,
    private snackBar: MatSnackBar,
  ) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    // filtering autocomplete options for author input
    this.filteredAuthors = this.bookForm.get('author')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterAuthors(value || '')),
    );
    this.loadAuthors();
  }

  // rating selection logic
  protected setRating(starCount: number) {
    this.selectedRating = starCount;
    this.bookForm.get('rating')?.setValue(starCount);
  }

  protected resetRating() {
    this.setRating(0);
  }
  // authors autocomplete logic
  private _filterAuthors(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.authors.filter((author) =>
      author.toLowerCase().includes(filterValue),
    );
  }

  private loadAuthors(): void {
    this.bookService.getAuthors().subscribe((authors) => {
      this.authors = authors;
    });
  }

  protected onSubmit() {
    console.log('submit called');
    if (this.bookForm.valid) {
      const formData = this.bookForm.value;
      this.bookService.saveBookForm(formData).subscribe(
        (id) => {
          this.bookForm.reset();
          // fire a reset event as a reset type button
          this.bookFormElement.nativeElement.dispatchEvent(new Event('reset'));
          this.snackBar.open(`Book saved with ID: ${id}`, 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Error saving book:', error);
        },
      );
    } else {
      console.error('Form invalid. Please check the fields.');
    }
  }

  // Tinymce init
  handleEditorInit(e: any) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  protected get getFieldRequiredMessage(): string {
    return 'Field is required!';
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 3000 });
  }

  // TODO remove when done
  logRequiredFields(formGroup: FormGroup) {
    console.log(this.bookForm.get('body')!.value);
    console.log(formGroup.get('body')?.errors);
    console.log(this.bookForm.get('body')?.getError('minWordCount'));
    // Object.keys(formGroup.controls).forEach((field) => {
    //   const control = formGroup.get(field);
    //   if (control instanceof FormControl) {
    //     console.log('Field:', field);
    //     console.log('errors: ', control.errors);
    //     console.log('dirty: ', control.dirty);
    //     control.updateValueAndValidity();
    //     console.log('Validity Status:', control.status); // Log the validity status
    //     console.log('Control Value:', control.value);
    //     console.log('Control Touched:', control.touched);
    //   } else if (control instanceof FormGroup) {
    //     this.logRequiredFields(control);
    //   }
    // });
  }

  onClick() {
    this.logRequiredFields(this.bookForm);
  }
}

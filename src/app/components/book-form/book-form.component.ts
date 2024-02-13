import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsyncSubject, Observable, Subject, map, startWith } from 'rxjs';
import { IBook } from '../../interfaces/book-interface';
import { BookStorageService } from '../../services/book-storage.service';
import { dateValidator } from '../../validators/date.validator';
import { minWordCount } from '../../validators/min-wordcount.validator';
import { integerValidator } from '../../validators/positive-integer.validator';
import { urlValidator } from '../../validators/url-format.validator';

const MIN_DESCR_WORDCOUNT = 50;
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnInit {
  // id of book to be edited, if provided
  @Input() id: number | null = null;
  // for resetting the red invalid borders of the input fields after submit
  @ViewChild('formElement') bookFormElement!: ElementRef;

  private editorSubject: Subject<any> = new AsyncSubject();
  protected maxDate: Date;
  protected selectedRating: number = 0;
  protected authors: string[] = [];
  protected filteredAuthors!: Observable<string[]>;
  protected bookForm!: FormGroup;
  protected pageTitle: string = 'Add a new book';
  protected pageSubtitle: string = 'Fill in the details and click Submit';

  constructor(
    private bookService: BookStorageService,
    private snackBar: MatSnackBar,
  ) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    if (this.id) {
      this.pageTitle = 'Edit book';
      this.pageSubtitle = 'Apply the changes to the data and click Submit';
      console.log('edit this id', this.id);
      this.bookService.getBook(this.id).subscribe({
        next: (value) => {
          this.bookForm = this.createForm(value);
          this.selectedRating = value.rating ? value.rating : 0;
        },
        error: (err) => console.log('error:', err),
      });
    } else {
      this.bookForm = this.createForm();
      console.log('no id : ', this.id);
    }

    // filtering autocomplete options for author input
    this.filteredAuthors = this.bookForm.get('author')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterAuthors(value || '')),
    );
    this.loadAuthors();
  }

  protected createForm(bookData?: IBook): FormGroup {
    return new FormGroup({
      // For each field: set the value from bookData if it exists, otherwise set an initial value
      name: new FormControl(bookData ? bookData.name : '', [
        Validators.required,
      ]),
      author: new FormControl(bookData ? bookData.author : '', [
        Validators.required,
      ]),
      rating: new FormControl(bookData ? bookData.rating : 0),
      bookWebsiteUrl: new FormControl<string | null>(
        bookData ? bookData.bookWebsiteUrl : null,
        [urlValidator()],
      ),
      numberOfPages: new FormControl(bookData ? bookData.numberOfPages : null, [
        Validators.required,
        Validators.min(1),
      ]),
      totalNumber: new FormControl<number | null>(
        bookData ? bookData.totalNumberOfBooks : null,
        [Validators.required, Validators.min(0), integerValidator()],
      ),
      printDate: new FormControl<Date | null>(
        bookData ? bookData.printDate : null,
        dateValidator(),
      ),
      description: new FormControl<string | null>(
        bookData ? bookData.description : null,
        [Validators.required],
        minWordCount(this.editorSubject, MIN_DESCR_WORDCOUNT),
      ),
    });
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
      this.authors = authors.filter((el) => el !== '');
    });
  }

  protected onSubmit() {
    console.log('submit called');
    if (this.bookForm.valid) {
      const formData = this.bookForm.value;
      this.bookService.saveBookForm(formData, this.id).subscribe(
        (id) => {
          // if editing, keep the data in the form, otherwise reset
          if (!this.id) {
            this.bookForm.reset();
            // fire a reset event to clear the alerts on the form fields
            this.bookFormElement.nativeElement.dispatchEvent(
              new Event('reset'),
            );
          }

          this.openSnackBar(`Book saved with ID: ${id}`);
        },
        (error) => {
          console.error('Error saving book:', error);
        },
      );
    } else {
      console.error('Form invalid. Please check the fields.');
    }
  }

  // Tinymce editor init
  protected handleEditorInit(e: any) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  protected get getFieldRequiredMessage(): string {
    return 'Field is required!';
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss', { duration: 3000 });
  }
}

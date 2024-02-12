import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const minWordCount = (
  editorSubject: Subject<any>,
  wordLimit: number,
): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return editorSubject.pipe(
      map((editor) => {
        const wordCount = editor.plugins.wordcount.body.getWordCount();

        let res =
          wordCount <= wordLimit
            ? {
                minWordCount: {
                  requiredLength: wordLimit,
                  actualLength: wordCount,
                },
              }
            : null;
        return res;
      }),
    );
  };
};

export { minWordCount };

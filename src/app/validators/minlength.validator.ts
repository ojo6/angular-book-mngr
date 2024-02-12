import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const minlength = (
  editorSubject: Subject<any>,
  characterLimit: number,
): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return editorSubject.pipe(
      map((editor) => {
        const characterCount =
          editor.plugins.wordcount.body.getCharacterCount();
        console.log('character count', characterCount);
        let res =
          characterCount <= characterLimit
            ? null
            : {
                minlength: {
                  requiredLength: characterLimit,
                  actualLength: characterCount,
                },
              };
        console.log('editor validator called ', res);
        return res;
      }),
    );
  };
};

export { minlength };

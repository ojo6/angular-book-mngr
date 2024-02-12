import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

// Validate that the value is a positive integer
export function dateValidator(): ValidatorFn {
  const currentDate = new Date();
  return (control: AbstractControl): ValidationErrors | null => {
    // only check if it's not null
    const badDate = control.value && control.value > currentDate;
    return badDate ? { badDate: { value: control.value } } : null;
  };
}

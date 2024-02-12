import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

// Validate that the value is a positive integer
export function integerValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const badInteger = !Number.isInteger(control.value) || control.value < 0;
    return badInteger ? { badInteger: { value: control.value } } : null;
  };
}

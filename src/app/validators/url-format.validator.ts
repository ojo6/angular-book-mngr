import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function urlValidator(): ValidatorFn {
  const urlRegex: RegExp =
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+)(\/\S*)?$/;
  return (control: AbstractControl): ValidationErrors | null => {
    // only check if it's not null
    const badURL = control.value && !urlRegex.test(control.value);
    return badURL ? { badURL: { value: control.value } } : null;
  };
}

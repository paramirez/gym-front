import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class RegisterValidator {
  static passwordValidator(control: AbstractControl): ValidationErrors | null {
    return (control.value as string).indexOf(' ') >= 0
      ? { withSpaces: true }
      : null;
  }
}

import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  static isNumberCheck(): ValidatorFn {
    return  (c: AbstractControl): {[key: string]: boolean} | null => {
      const number = /^[.\d]+$/.test(c.value) ? +c.value : NaN;
      if (number !== number) {
        return { 'value': true };
      }

      return null;
    };
  }
}

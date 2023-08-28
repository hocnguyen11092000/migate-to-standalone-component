import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormControlOptions,
} from '@angular/forms';

export interface AbstractControlWarn extends AbstractControl {
  warning: any;
}

export class ControlWarning extends FormControl {
  warning?: any = {};

  hasWarning() {
    return Object.keys(this.warning).length > 0;
  }
}

export function lengthWarning(c: AbstractControlWarn) {
  c.warning =
    c.value.length && c.value.length < 5
      ? { length: 'length should be greater than 5 charter' }
      : {};
  return null;
}

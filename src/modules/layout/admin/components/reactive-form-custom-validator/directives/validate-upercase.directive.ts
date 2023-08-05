import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl } from '@angular/forms';
@Directive({
  selector: '[appUpercaseValidation]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: equalCheck,
      multi: true,
    },
  ],
  standalone: true,
  exportAs: 'appUpercaseValidation',
})
export class CustomVaidatorDirective {
  constructor() {}
}
function equalCheck(control: AbstractControl) {
  if (!control.value) return null;
  return control.value !== (control.value + '').toUpperCase()
    ? { notUpercaseText: true }
    : null;
}

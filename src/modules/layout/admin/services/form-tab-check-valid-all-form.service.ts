import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { FormLenghStervice } from './form-lenght.service';

@Injectable({
  providedIn: 'root',
})
export class FormTabCheckValidAllField {
  constructor(private _formLength: FormLenghStervice) {}

  formStatus = new ReplaySubject(3);
  formLength = new BehaviorSubject(0);
  formFieldError = new ReplaySubject(3);

  setFormStatus(status: boolean) {
    this.formStatus.next(status);
  }

  setFormLength(length: number) {
    this.formLength.next(length);
  }

  setFormFieldError(value: []) {
    this.formFieldError.next({
      formErrors: { ...value },
    });
  }
}

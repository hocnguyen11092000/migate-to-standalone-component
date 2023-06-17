import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormLenghStervice {
  private formLengthSubject = new BehaviorSubject(2);
  formlength$ = this.formLengthSubject.asObservable();

  setFormLength(length: number) {
    this.formLengthSubject.next(length);
  }

  get getFormLength() {
    return this.formLengthSubject.value;
  }
}

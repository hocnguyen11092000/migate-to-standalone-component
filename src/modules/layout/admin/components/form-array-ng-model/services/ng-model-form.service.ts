import { Injectable } from '@angular/core';
import { BehaviorSubject, map, scan } from 'rxjs';
import { NgFormLength } from './ng-form-length.service';

@Injectable({
  providedIn: 'root',
})
export class NgModelForm {
  constructor(private _ngFormLengthService: NgFormLength) {}

  private isValidFormSubject = new BehaviorSubject(false);
  isValidForm$ = this.isValidFormSubject.asObservable().pipe(
    scan((acc: any, curr: any) => [...acc, curr], []),
    map((arr) => arr.slice(-(this._ngFormLengthService.formLength$.value || 1)))
  );

  setValidForm(status: boolean) {
    this.isValidFormSubject.next(status);
  }
}

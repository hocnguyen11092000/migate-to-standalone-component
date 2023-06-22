import { Injectable, Injector, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgModelForm } from './ng-model-form.service';

@Injectable({
  providedIn: 'root',
})
export class NgFormLength {
  constructor(private injector: Injector) {}
  formLength$ = new BehaviorSubject(1);

  setFormLength(value: number) {
    this.formLength$.next(value);
  }

  private get test() {
    return this.injector.get(NgModelForm);
  }

  doSomething() {
    console.log('___prevent circular import', this.test);
  }
}

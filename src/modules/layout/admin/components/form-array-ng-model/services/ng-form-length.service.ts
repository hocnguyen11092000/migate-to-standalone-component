import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NgFormLength {
  formLength$ = new BehaviorSubject(1);

  setFormLength(value: number) {
    this.formLength$.next(value);
  }
}

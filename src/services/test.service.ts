import { Injectable } from '@angular/core';

import { BehaviorSubject, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  inputValue$ = new BehaviorSubject('');

  setInputValue(value: string) {
    this.inputValue$.next(value);
  }

  getAnotherList(value: string) {
    return of('hello from backend service' + value + Math.random()).pipe(
      delay(800)
    );
  }
}

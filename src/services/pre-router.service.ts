import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  preUrl$ = new BehaviorSubject('');

  setPreUrl(value: string) {
    this.preUrl$.next(value);
  }
}

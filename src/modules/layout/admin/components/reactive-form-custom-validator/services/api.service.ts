import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, delay, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor() {}

  validateUsername(username: string): Observable<boolean> | any {
    let existedUsers = ['hoc', 'nguyen', 'hoang thai'];
    let isValid = existedUsers.every((x) => x !== username);
    return of(isValid).pipe(
      debounceTime(500),
      delay(1000),
      tap(() => {
        console.log(`Trigger API call ${username}`);
      })
    );
  }
}

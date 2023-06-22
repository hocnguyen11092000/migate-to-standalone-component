import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _token = '';

  getAuthorizationToken() {
    return this._token;
  }

  setToken(token: string) {
    this._token = token;
  }
}

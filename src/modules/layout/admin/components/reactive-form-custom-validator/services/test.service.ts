import { Inject, Injectable } from '@angular/core';
import { token } from '../reactive-form-custom-validator.component';

@Injectable()
export class TestProviderService {
  a = '';
  // constructor(@Inject(token) public token: any) {
  //   console.log('token,', token);
  // }
}

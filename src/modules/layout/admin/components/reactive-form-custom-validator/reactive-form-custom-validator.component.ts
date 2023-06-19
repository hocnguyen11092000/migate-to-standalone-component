import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { markDirtyForm } from 'src/utils';
import { NoWhitespaceValidator } from './validator/validator.no-white-space';
import { Observable, map, of, switchMap, timer } from 'rxjs';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-reactive-form-custom-validator',
  templateUrl: './reactive-form-custom-validator.component.html',
  styleUrls: ['./reactive-form-custom-validator.component.css'],
})
export class ReactiveFormCustomValidatorComponent implements OnInit {
  authForm!: FormGroup;
  constructor(private _fb: FormBuilder, private _api: ApiService) {}

  ngOnInit() {
    this.initAuthForm();
  }

  private initAuthForm() {
    this.authForm = this._fb.group({
      userName: [
        '',
        Validators.compose([Validators.required, NoWhitespaceValidator()]),
        this.validateUserNameFromAPIDebounce.bind(this),
      ],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  handleSubmitForm() {
    if (this.authForm.valid) {
      console.log(this.authForm.value);
    } else {
      markDirtyForm(this.authForm);
    }
  }

  validateUserNameFromAPIDebounce(control: AbstractControl): any {
    return of(null).pipe(
      switchMap(() =>
        this._api.validateUsername(control.value).pipe(
          map((isValid: any) => {
            if (isValid) {
              return null;
            }
            return {
              usernameDuplicated: true,
            };
          })
        )
      )
    );
  }
}

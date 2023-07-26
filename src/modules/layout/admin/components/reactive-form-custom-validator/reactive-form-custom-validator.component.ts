import {
  Component,
  Inject,
  InjectionToken,
  OnInit,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { markDirtyForm } from 'src/utils';
import { NoWhitespaceValidator } from './validator/validator.no-white-space';
import { Observable, map, of, switchMap, timer } from 'rxjs';
import { ApiService } from './services/api.service';
import { NgFor, NgIf } from '@angular/common';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { UpercaseTextDirective } from './directives/upercase.directive';
import { TestProviderService } from './services/test.service';

export const token = new InjectionToken('token');

@Component({
  selector: 'app-reactive-form-custom-validator',
  templateUrl: './reactive-form-custom-validator.component.html',
  styleUrls: ['./reactive-form-custom-validator.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzWaveModule,
    NgIf,
    FormsModule,
    UpercaseTextDirective,
    NgFor,
  ],
  providers: [
    // {
    //   provide: TestProviderService,
    //   useClass: TestProviderService,
    // },
    {
      provide: token,
      useClass: TestProviderService,
    },
  ],
})
export class ReactiveFormCustomValidatorComponent implements OnInit {
  value = '';
  // private _test = inject(token);

  authForm!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _api: ApiService,
    @Inject(token) private _test: any
  ) {}

  ngOnInit() {
    this.initAuthForm();
    console.log(this._test);
  }

  private initAuthForm() {
    this.authForm = this._fb.group({
      userName: [
        '',
        Validators.compose([Validators.required, NoWhitespaceValidator()]),
        this.validateUserNameFromAPIDebounce.bind(this),
      ],
      password: ['', Validators.compose([Validators.required])],
      test: ['', [Validators.required]],
      group: this._fb.group({
        group1: ['', [Validators.required]],
        group2: ['', [Validators.required]],
      }),
      array: this._fb.array([
        this._fb.group({
          a1: ['', Validators.required],
          a2: ['', Validators.required],
        }),
        this._fb.group({
          a1: ['', Validators.required],
          a2: ['', Validators.required],
        }),
      ]),
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

  addValidator() {
    const _testControl = this.authForm.get('test') as FormControl;
    _testControl.addValidators(Validators.minLength(5));

    _testControl.markAsDirty();

    // call this function because the angular app need a signal when you add validation
    _testControl.updateValueAndValidity({ onlySelf: false });
  }
}

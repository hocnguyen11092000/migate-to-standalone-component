import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import _ from 'lodash';
import { debounceTime, tap } from 'rxjs';
import { markDirtyForm } from 'src/utils';
import { TypedFormGroup } from 'src/utils/typed-form';

export interface IDuplicate {
  infor: IInfor[];
}

export interface IInfor {
  id: string;
  name: string;
}

@Component({
  selector: 'app-proxy',
  templateUrl: './proxy.component.html',
  styleUrls: ['./proxy.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProxyComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _cdr = inject(ChangeDetectorRef);

  customMessage: Array<Record<string, unknown>> = [
    { required: 'custom message required' },
    { duplicate: 'custom duplicated' },
    { email: 'custom invalid email' },
  ];

  readonly duplicateFm: FormGroup<{ infor: FormArray<FormControl<unknown>> }> =
    this._fb.nonNullable.group({
      infor: this._fb.array([]),
    });

  validator: ValidatorFn = this.validateDuplicate.bind(this);

  ngOnInit() {
    _.forEach(_.times(3, _.constant(null)), () => {
      this.initAndPushInforControl();
    });

    this.duplicateFm.valueChanges
      .pipe(
        debounceTime(300),
        tap(() => {
          const _faControl = this.getInforControl()!.controls;
          const _fControl = _.map(_faControl, (_fg: FormGroup) => {
            return _fg.controls;
          });

          _.forEach(_fControl, (_fc: Record<string, AbstractControl>) => {
            _.forEach(_.values(_fc), (_f: AbstractControl) => {
              if (_f.dirty) {
                // _f.addValidators(this.validator);

                const _currentValue = _.get(_f, 'value');
                const _currentFormValue = this.getValuesOfFormArray(
                  this.getInforControl()
                );
                const _currentIsDuplicate = this.isInCluduesValue(
                  _currentValue,
                  _currentFormValue
                );

                if (!_currentIsDuplicate) {
                  // _f.removeValidators(this.validator);
                  _.unset(_f, 'errors.duplicate');
                  _.size(_.get(_f, 'errors')) <= 0 && _f.setErrors(null);

                  _f.updateValueAndValidity({ onlySelf: true });
                  // this.updateControlStatus(_f);
                }
              }
            });
          });
        })
      )
      .subscribe();
  }

  updateControlStatus(fc: AbstractControl): void {
    if (fc.parent) {
      fc.updateValueAndValidity({ onlySelf: true });
      this.updateControlStatus(_.get(fc, 'parent'));
    }
  }

  getInforControl(): FormArray {
    return this.duplicateFm.controls['infor'] as FormArray;
  }

  initAndPushInforControl(): void {
    const _info: TypedFormGroup<IInfor> = this._fb.group({
      id: ['', [Validators.required, this.validator, Validators.minLength(2)]],
      name: [
        '',
        [
          Validators.required,
          this.validator,
          Validators.minLength(2),
          Validators.email,
        ],
      ],
    });

    this.pushInforForm(_info);
  }

  pushInforForm(infor): void {
    this.getInforControl().push(infor);
  }

  submitForm() {
    if (this.duplicateFm.valid) {
      console.log(this.duplicateFm.getRawValue());
    } else {
      markDirtyForm(this.duplicateFm);
    }
  }

  validateDuplicate(control: AbstractControl): ValidationErrors | null {
    const _value = _.get(control, 'value');

    if (control.dirty && _value) {
      const _formValue = this.getValuesOfFormArray(this.getInforControl());
      const _controlName = this.getNameOfControl(control) || 'unknown control';
      const _isDuplicate = this.isInCluduesValue(_value, _formValue);

      return _isDuplicate
        ? {
            duplicate: {
              name: _controlName,
            },
          }
        : null;
    }

    return null;
  }

  getValuesOfFormArray(fa: FormArray): Array<string> | null {
    let _result: string[] = [];

    if (!(fa instanceof FormArray)) return null;

    const _arrControl = fa.controls!;

    _.forEach(_arrControl, (fc: FormControl) => {
      _result.push(..._.values(_.result(fc, 'getRawValue')));
    });

    return _result;
  }

  getNameOfControl(control: AbstractControl): string {
    const formGroup = _.get(control, 'parent.controls');

    if (formGroup) {
      return _.find(_.keys(formGroup), (name) => {
        return control === formGroup[name];
      });
    }

    return '';
  }

  isInCluduesValue(value: string, compareValue: Array<string>): boolean {
    return (
      _.filter(
        compareValue,
        (_value) => _value.toLowerCase() === value.toLowerCase()
      ).length > 1
    );
  }
}

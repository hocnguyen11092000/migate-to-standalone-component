import {
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import * as _ from 'lodash';

export const markDirtyForm = (formInstant: FormGroup) => {
  _.forEach(_.values(formInstant.controls), (control: any) => {
    if (control.invalid) {
      console.log('control', control);

      const _formArray = _.get(control, 'controls');

      if (control instanceof FormGroup) {
        markDirtyForm(control);

        return;
      }

      if (control instanceof FormArray) {
        markDirtyFormAray(_formArray);
      }

      applyDirtyForm(control);
    }
  });
};

export const markDirtyFormAray = (formGroupArray: Array<FormGroup>) => {
  [...formGroupArray].forEach((item: FormGroup) => {
    const _controlArr = _.values(item.controls);

    _.forEach(_controlArr, (cx) => {
      applyDirtyForm(cx as FormControl);

      if (_.isArray(_.get(cx, 'controls'))) {
        markDirtyFormAray(_.get(cx, 'controls') || []);
      }
    });
  });
};

export const applyDirtyForm = (_control: FormControl): void => {
  _control.markAsDirty();
  _control.updateValueAndValidity({ onlySelf: true });
};

export const getFormValidationErrors = (
  formInstant: FormGroup,
  formIndex: number
) => {
  let _result: any = [];

  Object.keys(formInstant.controls).forEach((key) => {
    const controlErrors = formInstant?.get(key)
      ?.errors as ValidationErrors | null;

    if (formInstant?.get(key) instanceof FormArray) {
      _.set(_result, key, [
        ...getFielErorsFormArray(formInstant?.get(key) as FormArray, formIndex),
      ]);
    } else {
      if (controlErrors) {
        Object.keys(controlErrors).forEach((keyError) => {
          _.set(_result, key, {
            formIndex: _.isNumber(formIndex) ? formIndex : null,
            control: key,
            error: keyError,
            value: controlErrors[keyError],
          });
        });
      }
    }
  });

  return _result;
};

export const getFielErorsFormArray = (
  formArray: FormArray,
  formIndex: number
) => {
  const _subErrors: any = [];

  const _formControlsArray =
    (_.get(formArray, 'controls') as Array<FormGroup>) || [];

  if (_.size(_formControlsArray)) {
    _.forEach(_formControlsArray, (formGroup: FormGroup, _indexFormArray) => {
      const _formControls = _.get(formGroup, 'controls');

      if (_formControls) {
        _.forEach(_.keys(_formControls), (_key, index: number) => {
          if (_.get(_formControls, _key) instanceof FormArray) {
            _.set(_subErrors[_indexFormArray], 'children', [
              ...getFielErorsFormArray(
                _.get(_formControls, _key) as FormArray,
                formIndex
              ),
            ]);
          } else {
            const _errorFields = _.get(_formControls[_key], 'errors');

            if (_errorFields) {
              _.forEach(_.keys(_errorFields), (_errorKey) => {
                _subErrors.push({
                  formIndex: _.isNumber(formIndex) ? formIndex : null,
                  control: _key,
                  error: _errorKey,
                  value: _errorFields[_errorKey],
                  parentIndex: _indexFormArray,
                });
              });
            }
          }
        });
      }
    });
  }

  return _subErrors;
};

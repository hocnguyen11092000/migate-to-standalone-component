import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import * as _ from 'lodash';

export const markDirtyForm = (formInstant: FormGroup) => {
  _.forEach(_.values(formInstant.controls), (control: any) => {
    if (control.invalid) {
      const _formArray = _.get(control, 'controls');

      if (_formArray) {
        [..._formArray].forEach((item: FormGroup) => {
          const _controlArr = _.values(item.controls);

          _.forEach(_controlArr, (cx) => {
            applyDirtyForm(cx as FormControl);
          });
        });
      }

      applyDirtyForm(control);
    }
  });
};

export const applyDirtyForm = (_control: FormControl): void => {
  _control.markAsDirty();
  _control.updateValueAndValidity({ onlySelf: true });
};

export const getFormValidationErrors = (
  formInstant: FormGroup,
  formIndex?: number
) => {
  const result: any = [];

  Object.keys(formInstant.controls).forEach((key) => {
    const controlErrors = formInstant?.get(key)
      ?.errors as ValidationErrors | null;

    if (controlErrors) {
      Object.keys(controlErrors).forEach((keyError) => {
        result.push({
          formIndex: _.isNumber(formIndex) ? formIndex : null,
          control: key,
          error: keyError,
          value: controlErrors[keyError],
        });
      });
    }
  });

  return result;
};

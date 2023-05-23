import { FormControl, FormGroup } from '@angular/forms';
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

import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash';

@Pipe({ name: 'getSingalError' })
export class GetSignalError implements PipeTransform {
  transform(value: Record<string, unknown>, ...args: any[]) {
    if (_.size(value)) {
      return _.head(_.keys(value));
    }

    return '';
  }
}

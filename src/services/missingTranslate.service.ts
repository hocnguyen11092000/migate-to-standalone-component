import { Injectable } from '@angular/core';
import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
} from '@ngx-translate/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class MyMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    const _defaultKey = _.get(params, 'interpolateParams.default');

    return _defaultKey || 'CANNOT FOUND KEY HAS BEEN SPECIFIED';
  }
}

import { inject } from '@angular/core';
import { NgModelForm } from '../services/ng-model-form.service';

export const userData = [
  {
    name: 'team 1',
    users: [
      {
        name: 'user 1',
        password: '123',
      },
      {
        name: 'user 2',
        password: '123',
      },
    ],
  },
  {
    name: 'team 2',
    users: [
      {
        name: 'user 1 team 2 ',
        password: '123',
      },
      {
        name: 'user 2 team 2',
        password: '123',
      },
    ],
  },
  {
    name: 'team 3',
    users: [
      {
        name: 'user 3 team 3 ',
        password: '123',
      },
      {
        name: 'user 1 team 3',
        password: '123',
      },
    ],
  },
];

export const injectFunction = () => {
  const _ngFormService = inject(NgModelForm);
  console.log('inject function __', _ngFormService);
};

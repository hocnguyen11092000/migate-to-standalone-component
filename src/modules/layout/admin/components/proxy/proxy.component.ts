import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { proxy } from './utils/proxy.utils';

const userB: any = {
  name: 'b',
  age: 20,
  active: false,
};

@Component({
  selector: 'app-proxy',
  templateUrl: './proxy.component.html',
  styleUrls: ['./proxy.component.css'],
})
export class ProxyComponent implements OnInit {
  constructor(private _cdr: ChangeDetectorRef) {}

  a: any = {
    name: '1gagag25',
    email: '155555',
    any: 'fafaf',
    KKKgaga: 'fafaf',
  };

  ngOnInit() {
    const b: any = {
      name: '123',
      phone: '123',
      test: 'fafafa',
    };

    const handler3 = {
      get(target: any, prop: any, receiver: any) {
        console.log('run here__');

        const newObj = target;

        if (b[prop]) {
          newObj[prop] = b[prop];
        }

        return newObj[prop];
      },
    };

    const test = new Proxy(this.a, handler3);

    // console.log(test);

    let user_2: any = {
      name: 'John',
      age: 30,
      _password: '***',
    };

    let user_3 = new Proxy(user_2, {
      get(target, p) {
        console.log('run get');

        target['test'] = 'updated value';

        return Reflect.get(target, p);
      },
      set(target, p, value) {
        return Reflect.set(target, p, value);
      },

      ownKeys(target) {
        return Object.keys(target).filter((key) => !key.startsWith('_'));
      },
    });

    user_3.x = 'x';
    console.log({ ...user_2 });

    // "ownKeys" filters out _password
    // for (let key in user_2) console.log(key);
  }
}

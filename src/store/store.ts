import { ChangeDetectorRef, ViewRef, inject } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';

const COMPUTERS = Symbol.for('__computers__');
const IS_STATE = Symbol.for('__is_state__');

export type Comparer<TValue> = (a: TValue, b: TValue) => boolean;
export type Compares<TState extends object> = {
  [TKey in keyof TState]?: Comparer<TState[TKey]>;
} & { rootComparer?: Comparer<TState> };

export type Computer<TValue, Tcomputed = TValue> = (value: TValue) => Tcomputed;
export interface WithValue<TValue> {
  value: TValue;
}

export interface With$<TValue> {
  $: Observable<TValue>;
}

function isState(value: unknown): boolean {
  return (value as { [IS_STATE]: boolean })[IS_STATE];
}

function getComputers<TValue, Tcomputed = TValue>(
  value: InjectedState<TValue> | InjectedReactive<TValue>
): Array<
  [BehaviorSubject<Tcomputed>, Computer<TValue, Tcomputed>, Set<string>]
> {
  return (
    value as unknown as {
      [COMPUTERS]: Array<
        [BehaviorSubject<Tcomputed>, Computer<TValue, Tcomputed>, Set<string>]
      >;
    }
  )[COMPUTERS];
}

export type InjectedReactive<TValue> = WithValue<TValue> & With$<TValue>;
export type InjectedState<TState> = With$<TState> & TState;
export type Computed<TValue> = With$<TValue> & WithValue<TValue>;

export function injectReactive<TValue>(
  value: TValue,
  comparer?: Comparer<TValue>
): InjectedReactive<TValue> {
  const cdr = inject(ChangeDetectorRef) as ViewRef;
  const reactive$ = new BehaviorSubject<TValue>((value ?? null)!);
  const $ = reactive$.pipe(distinctUntilChanged(comparer));

  const computers: Array<[BehaviorSubject<unknown>, Computer<TValue>]> = [];

  queueMicrotask(() => {
    cdr.onDestroy(() => {
      reactive$.complete();
    });
  });

  return new Proxy(
    {},
    {
      get(target, p, receiver) {
        if (p === 'value') {
          return reactive$.getValue();
        }

        if (p === '$') {
          return $;
        }

        if (p === COMPUTERS) {
          return computers;
        }

        return Reflect.get(target, p, receiver);
      },
      set(target, p, val, receiver) {
        if (p === 'value') {
          if (cdr.destroyed) {
            return true;
          }

          reactive$.next(val);

          for (const [computerSubject, computerFn] of computers) {
            computerSubject.next(computerFn(val));
          }

          cdr.markForCheck();
          return true;
        }

        return Reflect.set(target, p, val, receiver);
      },
    }
  ) as InjectedReactive<TValue>;
}

export function injectState<TState extends object>(
  initialState: Partial<TState>
);

export class Persion {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  name: string = '';
  age: number = 0;

  run() {}
}

export class Nga extends Persion {
  constructor() {
    super();
  }
}

const nga = new Nga('nga');

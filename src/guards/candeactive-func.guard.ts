import { inject } from '@angular/core';
import { CanDeactivateFn, Router, UrlTree } from '@angular/router';
import { map, of, take, tap, delay } from 'rxjs';

export const candeActiveFunc: CanDeactivateFn<unknown> = (
  component: any,
  currentRoute,
  currentState,
  nextState
) => {
  console.log(component, currentRoute, currentState, nextState);
  const _router = inject(Router);

  const response = component.navigate();

  if (response instanceof UrlTree && nextState.url == response.toString()) {
    return true;
  }

  return navigate(_router);

  // return of([]).pipe(
  //   delay(100),
  //   map(() => true),
  //   tap(() => {
  //     component.navigate();
  //   })
  // );
};

function navigate(_router: Router) {
  setTimeout(() => {
    // _router.navigate(['/admin/reactive-form-custom-validator']);
  }, 0);

  return true;
}

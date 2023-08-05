import { Component, Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CanDeactivateConfirmLeave implements CanDeactivate<any> {
  constructor() {}
  private _router = inject(Router);

  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    console.log(currentRoute, currentState, nextState);
    if (component?.isChanging) {
      // return window.confirm(
      //   'We realize there was a change, are you sure you want to leave?'
      // );
      // component?.navigate();
      return false;
    } else {
      return true;
    }
  }
}

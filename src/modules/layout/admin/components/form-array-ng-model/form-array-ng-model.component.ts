import { injectFunction } from './data/index';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { userData } from './data';
import * as _ from 'lodash';
import { NgModelForm } from './services/ng-model-form.service';
import { Subject, debounceTime, pipe, takeUntil } from 'rxjs';
import { NgFormLength } from './services/ng-form-length.service';

@Component({
  selector: 'app-form-array-ng-model',
  templateUrl: './form-array-ng-model.component.html',
  styleUrls: ['./form-array-ng-model.component.scss'],
})
export class FormArrayNgModelComponent implements OnInit, OnDestroy {
  data = userData;
  destroy$ = new Subject();
  private _ngFormService = inject(NgModelForm);

  constructor(
    // private _ngFormService: NgModelForm,
    private _ngFormLengthService: NgFormLength
  ) {
    injectFunction();
  }

  ngOnInit(): void {
    this._ngFormLengthService.setFormLength(3);

    this._ngFormService.isValidForm$
      .pipe(debounceTime(100), takeUntil(this.destroy$))
      .subscribe((val) => {
        console.log(val);
      });
  }

  handleSubmitForm() {
    const items = document.querySelectorAll('.ng-model-submit > button') as any;

    if (items) {
      _.forEach(items, (item: HTMLElement) => {
        item.click();
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

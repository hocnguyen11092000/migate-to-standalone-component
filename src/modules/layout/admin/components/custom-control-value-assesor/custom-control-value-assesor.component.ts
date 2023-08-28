import {
  AbstractControlWarn,
  ControlWarning,
} from './../../abstract/control-warning';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { lengthWarning } from '../../abstract/control-warning';
import { query } from '@angular/animations';
import {
  combineLatest,
  distinctUntilChanged,
  fromEvent,
  map,
  merge,
  tap,
  throttleTime,
  filter,
  debounceTime,
} from 'rxjs';
import _ from 'lodash';

@Component({
  selector: 'app-custom-control-value-assesor',
  templateUrl: './custom-control-value-assesor.component.html',
  styleUrls: ['./custom-control-value-assesor.component.css'],
})
export class CustomControlValueAssesorComponent
  implements OnInit, AfterViewInit
{
  constructor() {}

  rate = new FormControl(null);

  query = new ControlWarning('', [
    Validators.required,
    lengthWarning.bind(this),
  ]);

  ngAfterViewInit(): void {}

  ngOnInit() {
    this.query.valueChanges
      .pipe(
        tap(() => {
          // console.log(this.query);
          console.log(this.query?.hasError('required'));
          console.log(this.query?.hasWarning());
        })
      )
      .subscribe();
  }
}

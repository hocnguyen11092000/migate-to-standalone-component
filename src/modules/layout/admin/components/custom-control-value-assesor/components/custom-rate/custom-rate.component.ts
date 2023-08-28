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
  selector: 'app-rate',
  templateUrl: './custom-rate.component.html',
  styleUrls: ['./custom-rate.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomRate),
      multi: true,
    },
  ],
})
export class CustomRate implements OnInit, ControlValueAccessor, AfterViewInit {
  constructor() {}
  star: any[] = [
    {
      id: 1,
      active: false,
    },
    {
      id: 2,
      active: false,
    },
    {
      id: 3,
      active: false,
    },
    {
      id: 4,
      active: false,
    },
    {
      id: 5,
      active: false,
    },
  ];

  @ViewChildren('star') starElm: QueryList<ElementRef>;
  @ViewChild('starContainer') starContainerElm: ElementRef;

  //#region handle state for control value assesor
  starSelectedId: number | null = null;
  touched = false;
  //#endregion for control value assesor

  ngAfterViewInit(): void {
    merge(
      ...[...this.starElm].map((elm) =>
        fromEvent(elm.nativeElement, 'mouseover')
      )
    )
      .pipe(
        debounceTime(60),
        distinctUntilChanged(),
        map((event: any) => event.target.getAttribute('data-id')),
        tap((id: any) => {
          if (id) {
            console.log(id);

            this.starSelectedId = null;

            this.star = this.star.map((item) => {
              _.set(item, 'active', false);

              if (item.id <= id) {
                _.set(item, 'active', true);
              }

              return item;
            });
          }
        })
      )
      .subscribe();

    fromEvent(this.starContainerElm.nativeElement, 'mouseleave')
      .pipe(
        debounceTime(120),
        tap((e) => {
          if (!this.starSelectedId) {
            this.star = this.star.map((item) => {
              _.set(item, 'active', false);

              return item;
            });
          }
        })
      )
      .subscribe();
  }

  ngOnInit() {}

  onChange = (val: any) => {};

  onTouched = () => {};

  writeValue(value: any): void {
    this.starSelectedId = value;
    this.star = this.star.map((item) => {
      if (item.id === value) {
        _.set(item, 'active', true);
      }

      return item;
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  handleSelectStar(id: number) {
    this.markAsTouched();

    this.starSelectedId = id;
    this.onChange(id);
  }
}

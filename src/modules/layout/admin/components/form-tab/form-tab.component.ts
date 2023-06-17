import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import * as _ from 'lodash';
import { filter, map, scan, take, takeLast, tap, toArray, zip } from 'rxjs';
import { FormTabCheckValidAllField } from '../../services/form-tab-check-valid-all-form.service';
import { formTabData } from './data';
import { FormTabItemComponent } from './form-tab-item/form-tab-item.component';
import { FORM_GROUP } from '../../constant';
import { FormLenghStervice } from '../../services/form-lenght.service';

@Component({
  selector: 'app-form-tab',
  templateUrl: './form-tab.component.html',
  styleUrls: ['./form-tab.component.scss'],
})
export class FormTabComponent implements OnInit {
  data: any = formTabData;
  @ViewChildren('item') item!: QueryList<FormTabItemComponent>;
  selectedIndex = 0;
  isChanging = false;

  constructor(
    private _formTabService: FormTabCheckValidAllField,
    private _formLength: FormLenghStervice
  ) {}

  ngOnInit(): void {
    this._formLength.setFormLength(3);

    if (!_.isEmpty(this.data)) {
      this._formTabService.setFormLength(_.size(this.data));
    }
  }

  handleChangeForm(isChanging: boolean): void {
    this.isChanging = isChanging;
  }

  handleSubmitAllForm() {
    _.forEach([...this.item], (i, index) => {
      i.handleSubmitForm(index);
    });

    this._formTabService.formStatus.subscribe(console.log);

    // this._formTabService.formStatus
    //   .pipe(
    //     scan((acc: any, curr) => {
    //       return [...acc, curr];
    //     }, []),
    //     filter((x) => _.size(x) === this._formTabService.formLength.value)
    //   )
    //   .subscribe((val: any) => {
    //     console.log(val);

    //     if (_.every(val, Boolean)) {
    //       console.log('all form is valid');
    //     } else {
    //       const isErrorInCurrentTab = !_.nth(val, this.selectedIndex);

    //       if (!isErrorInCurrentTab) {
    //         const errorIndex = _.findIndex(val, (i) => !i) || 0;
    //         this.selectedIndex = errorIndex;
    //       }
    //     }
    //   });

    zip([this._formTabService.formStatus, this._formTabService.formFieldError])
      .pipe(
        take(3),
        toArray(),
        map((arr) => {
          let formState: any = [];
          let formError: any = [];

          [...arr].forEach((item: any) => {
            formState = [...formState, item[0]];
            formError = [...formError, item[1]];
          });

          return {
            formState,
            formError,
          };
        }),
        tap((val) => {
          console.log(val);
        })
      )
      .subscribe((val: any) => {
        const { formState, formError } = val;

        if (_.every(formState, Boolean)) {
          console.log('all form is valid');
        } else {
          const isErrorInCurrentTab = !_.nth(formState, this.selectedIndex);

          if (!isErrorInCurrentTab) {
            const errorIndex = _.findIndex(formState, (i) => !i) || 0;
            this.selectedIndex = errorIndex;

            const errorField: any = _.nth(formError, errorIndex);
            console.log(errorField);
            if (errorField) {
              const _elmErr: HTMLElement | null = document.querySelector(
                `.${FORM_GROUP.PACKAGE} .${errorField[0]?.control}`
              );

              if (_elmErr) {
                setTimeout(() => {
                  _elmErr.scrollIntoView({
                    block: 'center',
                    behavior: 'smooth',
                  });
                }, 200);
              }
            }
          } else {
            const errorField: any = _.nth(formError, this.selectedIndex);

            if (errorField) {
              const _elmErr: HTMLElement | null = document.querySelector(
                `.${FORM_GROUP.PACKAGE} .${errorField[0]?.control}`
              );

              if (_elmErr) {
                setTimeout(() => {
                  _elmErr.scrollIntoView({
                    block: 'center',
                    behavior: 'smooth',
                  });
                }, 200);
              }
            }
          }
        }
      });
  }
}

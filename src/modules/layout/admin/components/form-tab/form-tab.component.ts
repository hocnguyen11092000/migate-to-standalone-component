import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { formTabData } from './data';
import { FormTabItemComponent } from './form-tab-item/form-tab-item.component';
import { FormTabCheckValidAllField } from '../../services/form-tab-check-valid-all-form.service';
import {
  Subject,
  buffer,
  debounceTime,
  filter,
  last,
  scan,
  skipUntil,
  takeLast,
  toArray,
  withLatestFrom,
} from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-form-tab',
  templateUrl: './form-tab.component.html',
  styleUrls: ['./form-tab.component.scss'],
})
export class FormTabComponent implements OnInit {
  data: any = formTabData;
  @ViewChildren('item') item!: QueryList<FormTabItemComponent>;
  selectedIndex = 0;

  constructor(private _formTabService: FormTabCheckValidAllField) {}

  ngOnInit(): void {
    if (!_.isEmpty(this.data)) {
      this._formTabService.setFormLength(_.size(this.data));
    }
  }

  handleSubmitAllForm() {
    _.forEach([...this.item], (i, index) => {
      i.handleSubmitForm(index);
    });

    this._formTabService.formStatus
      .pipe(
        scan((acc: any, curr) => {
          return [...acc, curr];
        }, []),
        filter((x) => _.size(x) === this._formTabService.formLength.value)
      )
      .subscribe((val: any) => {
        console.log(val);

        if (_.every(val, Boolean)) {
          console.log('all form is valid');
        } else {
          const isErrorInCurrentTab = !_.nth(val, this.selectedIndex);

          if (!isErrorInCurrentTab) {
            const errorIndex = _.findIndex(val, (i) => !i) || 0;
            this.selectedIndex = errorIndex;
          }
        }
      });
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import _ from 'lodash';

@Component({
  selector: '<app-show-error />',
  template: ` <span>{{ errorMessage }}</span> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowErrorComponent implements OnChanges {
  private _cdr = inject(ChangeDetectorRef);

  @Input() errors: Record<string, unknown>;
  @Input() customMessage: Array<Record<string, unknown>>;

  errortype: string = '';
  errorValue: unknown | null = null;
  errorMessage: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (this.errors && _.size(this.errors) > 0) {
      this.handleCookMessage();
    }
  }

  getMessage(_errorType: string): string {
    if (_errorType) {
      switch (_errorType) {
        case 'required':
          return 'this field is required';
        case 'minlength':
          return `this field is greater than ${this.errorValue} characters`;
        case 'duplicate':
          return 'this field is duplicated';
        case 'email':
          return 'Invalid email address';
        default:
          return '';
      }
    }

    return '';
  }

  handleCookMessage() {
    this.errortype = _.head(_.keys(this.errors));

    if (_.size(this.customMessage)) {
      const _item = _.find(this.customMessage, (m) => {
        return _.head(_.keys(m)) === this.errortype;
      });

      const _customType = _.head(_.keys(_item));

      if (_customType === this.errortype) {
        this.errorMessage = _.head(_.values(_item)) as string;

        return;
      }
    }

    if (this.errortype === 'minlength') {
      const requiredLength = _.get(this.errors, 'minlength.requiredLength');

      requiredLength && (this.errorValue = requiredLength);
    }

    this.errorMessage = this.getMessage(this.errortype);
  }
}

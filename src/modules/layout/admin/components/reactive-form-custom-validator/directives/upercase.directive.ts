import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';

let timer: any;
let timer2: any;

@Directive({
  selector: '[UpercaseText]',
  standalone: true,
})
export class UpercaseTextDirective {
  @Input('UpercaseText') allowUpperCase: boolean = false;
  @Input('RemoveVNTones') removeVNTones: boolean = false;
  @Input('SpecialCharacter') removeSpecialCharactor: boolean = true;
  @Input('AddressType') AddressType: boolean = false;
  @Input('lowerCase') lowerCase: boolean = false;
  @Input('emailType') emailType: boolean = false;
  @Input('onlyOneSpace') onlyOneSpace: boolean = false;
  @Input('removeSpace') removeSpace: boolean = false;
  isSpace = false;

  a = new BehaviorSubject('');
  _isVn = false;

  constructor(private ref: ElementRef, private readonly control: NgControl) {}

  @HostListener('input')
  oInputDirective() {
    this.toUpperCase();
  }
  // @HostListener('blur')
  // oBlurDirective() {
  //   if (!Helpers.isSafari()) this.toUpperCase()
  // }

  toUpperCase() {
    this._isVn = false;
    try {
      const selectionStart = this.ref.nativeElement.selectionStart;
      this.ref.nativeElement.value = this.allowUpperCase
        ? this.ref.nativeElement.value.toUpperCase()
        : this.lowerCase
        ? this.ref.nativeElement.value.toLowerCase()
        : this.ref.nativeElement.value;
      // if (this.removeVNTones) {
      //   this.removeVietnameseTones(this.ref.nativeElement.value);
      // }

      this.ref.nativeElement.setSelectionRange(selectionStart, selectionStart);
      if (this.control && this.control.control) {
        if (this.removeVNTones) {
          if (timer2) clearTimeout(timer2);
          timer2 = setTimeout(() => {
            this?.control?.control?.setValue(
              this.allowUpperCase
                ? this.removeVietnameseTones(
                    this.ref.nativeElement.value.toUpperCase()
                  )
                : this.lowerCase
                ? this.removeVietnameseTones(
                    this.ref.nativeElement.value.toLowerCase()
                  )
                : this.removeVietnameseTones(this.ref.nativeElement.value)
            );
          }, 0);
          this.control.control.updateValueAndValidity();
          return;
        }
        this.control.control.setValue(
          this.allowUpperCase
            ? this.ref.nativeElement.value.toUpperCase()
            : this.lowerCase
            ? this.ref.nativeElement.value.toLowerCase()
            : this.ref.nativeElement.value
        );
        this.control.control.updateValueAndValidity();
      }
    } catch (err) {}
  }

  removeVietnameseTones(str: string) {
    const _start = this.ref.nativeElement.selectionStart;
    console.log('__string here', str);

    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');

    this.a.next(str);

    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    if (this.removeSpace) {
      if (this.ref.nativeElement.value.includes(' ')) {
        this.isSpace = true;
        str = str.replace(/\s/g, '');
      }
    }

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      if (this.isSpace) {
        this.ref.nativeElement.setSelectionRange(_start - 1, _start - 1);
        this.isSpace = false;
      } else {
        this.ref.nativeElement.setSelectionRange(_start, _start);
      }
    }, 50);

    // Bỏ dấu câu, kí tự đặc biệt
    if (this.removeSpecialCharactor) {
      str = str.replace(
        /!|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        ''
      );

      if (this.onlyOneSpace) {
        str = str.replace(/ + /g, ' ');
      }
    }

    if (this.AddressType) {
      str = str.replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|{|}|\||\\/g,
        ''
      );
      str = _.deburr(str);

      if (this.onlyOneSpace) {
        str = str.replace(/ + /g, ' ');
      }
    }

    if (this.emailType) {
      str = str.replace(
        /\s|!|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        ''
      );

      //only 1 char @ and . in string email
      str = this.replaceWorkInArr(str, ['@']);
      str = str.replace(/\.+/g, '.');
    }

    // console.log('tèo __', this.a.value);

    return this._isVn ? this.a.value : str;
  }

  private replaceWorkInArr(
    str: string,
    workArr: Array<string | number>
  ): string {
    let _str = str;

    _.forEach(workArr, (w) => {
      _str = this.replaceWork(_str, w);
    });

    return _str;
  }

  private replaceWork(str: string, work: string | number): string {
    let _str = str;

    //if exits 2 char => replace the last of char
    if (true) {
      const _workString = (work + '').trim();

      if (_workString) {
        const _firstIndex = str.indexOf(_workString);
        const _lastIndex = str.lastIndexOf(_workString);

        if (_lastIndex > _firstIndex) {
          _str = str.slice(0, _lastIndex) + str.slice(_lastIndex + 1);

          return this.replaceWork(_str, work);
        }
      }
    }
    return _str;
  }
}

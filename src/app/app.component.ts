import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  skipUntil,
  skipWhile,
  takeWhile,
  filter,
  switchMap,
  of,
  debounceTime,
  distinctUntilChanged,
  tap,
  finalize,
} from 'rxjs';
import { TestService } from 'src/services/test.service';
import { TranslateCoreService } from 'src/services/translate.service';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  title = 'submit-mutiple-form';
  loadingg = false;
  constructor(
    private _translateCoreService: TranslateCoreService,
    private _testService: TestService,
    private _cdr: ChangeDetectorRef
  ) {}

  private _http = inject(HttpClient);

  ngOnInit(): void {
    this._http
      .get('https://649462370da866a95367ab9e.mockapi.io/category')
      .subscribe(console.log);

    this._http
      .get('https://649462370da866a95367ab9e.mockapi.io/login')
      .subscribe(console.log);

    this._translateCoreService.initCoreTranslate();

    this._testService.inputValue$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((val: any) => val.trim()),
        tap(() => {
          this.loadingg = true;
          this._cdr.detectChanges();
        }),
        switchMap((val) =>
          this._testService.getAnotherList(val).pipe(
            finalize(() => {
              // sử dụng tap hay finally đều dc vì nó call xong mới emit value
              this.loadingg = false;
              this._cdr.detectChanges();
            })
          )
        )
      )
      .subscribe((val) => {
        console.log(val);
      });
  }

  handleKeyUp(event: any) {
    this._testService.setInputValue(event.target.value);
  }
}

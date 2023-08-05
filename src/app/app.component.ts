import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
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
  pairwise,
  take,
} from 'rxjs';
import { TestService } from 'src/services/test.service';
import { TranslateCoreService } from 'src/services/translate.service';
import {
  NavigationEnd,
  Router,
  RouterOutlet,
  RoutesRecognized,
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterService } from 'src/services/pre-router.service';
import { MessagingService } from 'src/services/fire-messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  title = 'submit-mutiple-form';
  loadingg = false;

  // @HostListener('window:popstate', ['$event'])
  // onPopState(event: any) {
  //   console.log('router__', this._router);
  //   setTimeout(() => {
  //     this._router.navigateByUrl('admin/reactive-form-custom-validator');
  //   }, 300);
  // }
  message: any;

  constructor(
    private _translateCoreService: TranslateCoreService,
    private _testService: TestService,
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    private messagingService: MessagingService
  ) {
    _router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this._routerService.setPreUrl(event.url);
        // console.log('prev:', event.url);
      });
  }

  private _http = inject(HttpClient);
  private _routerService = inject(RouterService);

  ngOnInit(): void {
    // this.messagingService.requestPermission();
    // this.messagingService.receiveMessage();
    // this.message = this.messagingService.currentMessage;

    console.log('pre router___', this._routerService.preUrl$.value);

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

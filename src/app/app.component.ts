import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  ViewChild,
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
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  auditTime,
  throttleTime,
  concatMap,
  Subject,
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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { CommonModule } from '@angular/common';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterOutlet,
    NzSelectModule,
    FormsModule,
    CommonModule,
    ScrollingModule,
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  data: any = [];
  ngAfterViewInit(): void {
    window.scrollTo({
      top: 0,
    });

    this.cdkVirtualScrollViewport.scrolledIndexChange
      .pipe(
        skipWhile((index: number) => index <= 0),
        auditTime(120),
        tap(() => {
          const _elm = this.cdkVirtualScrollViewport.elementRef
            .nativeElement as HTMLElement;

          const _scrollHeight = _elm.scrollHeight;
          const _scrollTop = (_elm.scrollTop + 2000).toFixed(0);

          console.dir(_elm);
          console.log(_scrollHeight, _scrollTop);

          if (+_scrollTop > +_scrollHeight) {
            this._start.next(this._start.value + 30);
          }
        })
      )
      .subscribe();
  }

  @ViewChild(CdkVirtualScrollViewport)
  cdkVirtualScrollViewport!: CdkVirtualScrollViewport;

  title = 'submit-mutiple-form';
  loadingg = false;
  theme = '#F11A7B';
  _start = new BehaviorSubject(0);
  _limit = new BehaviorSubject(20);
  _loading = new Subject<boolean>();

  // @HostListener('window:popstate', ['$event'])
  // onPopState(event: any) {
  //   console.log('router__', this._router);
  //   setTimeout(() => {
  //     this._router.navigateByUrl('admin/reactive-form-custom-validator');
  //   }, 300);
  // }
  message: any;
  vm$!: Observable<any>;

  constructor(
    private _translateCoreService: TranslateCoreService,
    private _testService: TestService,
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    private messagingService: MessagingService,
    private nzConfigService: NzConfigService
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

    combineLatest([this._start, this._limit])
      .pipe(
        map(([_start, _limit]) => ({ _start, _limit })),
        concatMap((_params: any) => {
          this._loading.next(true);

          return this._http
            .get('https://jsonplaceholder.typicode.com/photos', {
              params: _params,
            })
            .pipe(
              finalize(() => {
                this._loading.next(false);
              })
            );
        })
      )
      .subscribe((val: any) => {
        this.data = [...this.data, ...val];
      });

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

  handleChangeTheme(theme: string) {
    this.nzConfigService.set('theme', {
      primaryColor: theme,
    });
  }
}

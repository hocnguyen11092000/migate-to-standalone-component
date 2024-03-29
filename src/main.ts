import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AngularFireModule } from '@angular/fire/compat';
import { createTranslateLoader } from './app/app.module';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { MyMissingTranslationHandler } from 'src/services/missingTranslate.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  TranslateModule,
  TranslateLoader,
  MissingTranslationHandler,
} from '@ngx-translate/core';
import { LayoutModule } from 'src/modules/layout/layout.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  withInterceptorsFromDi,
  provideHttpClient,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { AuthInterceptor } from './services/intercepter.service';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';

if (environment.production) {
  enableProdMode();
}

const ngZorroConfig: NzConfig = {
  theme: {
    primaryColor: '#c69',
  },
};

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebase),
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      LayoutModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
        missingTranslationHandler: {
          provide: MissingTranslationHandler,
          useClass: MyMissingTranslationHandler,
        },
        useDefaultLang: false,
      })
    ),
    { provide: NZ_I18N, useValue: en_US },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
  ],
}).catch((err) => console.error(err));

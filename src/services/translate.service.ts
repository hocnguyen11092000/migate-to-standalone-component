import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslateCoreService {
  constructor(private _translateService: TranslateService) {}

  initCoreTranslate() {
    this._translateService.addLangs(['en', 'vi']);
    this._translateService.setDefaultLang('en');
    this._translateService.use('en');
  }
}

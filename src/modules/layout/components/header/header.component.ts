import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  langs: string[] = [];
  currentlang: string = 'en';

  constructor(private _translateService: TranslateService) {}

  ngOnInit(): void {
    this.langs = this._translateService.getLangs();
    this.currentlang = this._translateService.currentLang;
  }

  handleChangeLang(lang: string) {
    this._translateService.use(lang);
  }
}

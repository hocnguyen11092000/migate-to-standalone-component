import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [NzLayoutModule, RouterLinkActive, RouterLink, NzSelectModule, ReactiveFormsModule, FormsModule, NgFor, TranslateModule]
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

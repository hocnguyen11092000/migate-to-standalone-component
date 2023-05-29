import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'submit-mutiple-form';
  constructor(private _translate: TranslateService) {}

  ngOnInit(): void {
    this._translate.addLangs(['en', 'vi']);
    this._translate.setDefaultLang('en');
    this._translate.use('en');
  }
}

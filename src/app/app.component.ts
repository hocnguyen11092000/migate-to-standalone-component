import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateCoreService } from 'src/services/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'submit-mutiple-form';
  constructor(private _translateCoreService: TranslateCoreService) {}

  ngOnInit(): void {
    this._translateCoreService.initCoreTranslate();
  }
}

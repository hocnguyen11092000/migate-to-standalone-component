import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormTabCustomAddDeleteComponent } from '../../form-tab-custom-add-delete.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit, OnChanges {
  //#region inject service
  private _formCustomAddDelete = inject(FormTabCustomAddDeleteComponent);
  //#endregion inject service

  _data: any;
  @Input()
  set data(val: any) {
    this._data = val + Math.random();
  }

  get data() {
    return this._data;
  }

  constructor() {}

  ngOnInit() {
    console.log('init ', this.data);
    console.log('parent compoent __', this._formCustomAddDelete);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data'] && changes['data']['currentValue']) {
      console.log('changes ', this.data);
    }
  }
}

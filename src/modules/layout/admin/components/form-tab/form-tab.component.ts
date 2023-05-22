import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { formTabData } from './data';
import { FormTabItemComponent } from './form-tab-item/form-tab-item.component';

@Component({
  selector: 'app-form-tab',
  templateUrl: './form-tab.component.html',
  styleUrls: ['./form-tab.component.scss'],
})
export class FormTabComponent implements OnInit {
  data: any = formTabData;
  @ViewChildren('item') item!: QueryList<FormTabItemComponent>;

  constructor() {}

  ngOnInit(): void {}

  handleSubmitAllForm() {
    [...this.item].forEach((i) => {
      i.handleSubmitForm();
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModelForm } from '../services/ng-model-form.service';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
    selector: 'app-form-array-ng-model-item',
    templateUrl: './form-array-ng-model-item.component.html',
    styleUrls: ['./form-array-ng-model-item.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, NzInputModule, NzButtonModule, NzWaveModule]
})
export class FormArrayNgModelItemComponent implements OnInit {
  @Input() data!: any;
  constructor(private _ngFormService: NgModelForm) {}

  ngOnInit() {}

  onSubmit(userForm: NgForm) {
    this._ngFormService.setValidForm(
      userForm.form.status === 'VALID' ? true : false
    );
  }
}

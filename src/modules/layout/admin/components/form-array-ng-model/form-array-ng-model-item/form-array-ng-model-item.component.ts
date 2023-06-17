import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgModelForm } from '../services/ng-model-form.service';

@Component({
  selector: 'app-form-array-ng-model-item',
  templateUrl: './form-array-ng-model-item.component.html',
  styleUrls: ['./form-array-ng-model-item.component.css'],
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

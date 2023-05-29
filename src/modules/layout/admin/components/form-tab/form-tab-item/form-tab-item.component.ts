import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { getFormValidationErrors, markDirtyForm } from 'src/utils';
import { FormTabCheckValidAllField } from '../../../services/form-tab-check-valid-all-form.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-form-tab-item',
  templateUrl: './form-tab-item.component.html',
  styleUrls: ['./form-tab-item.component.scss'],
})
export class FormTabItemComponent implements OnInit {
  @Input() data: any;
  packageForm!: FormGroup;
  haveFieldsErrors: boolean = true;
  level: number = 1;

  constructor(
    private _fb: FormBuilder,
    private _formTabService: FormTabCheckValidAllField
  ) {}

  ngOnInit(): void {
    this.handleInitForm();

    this.data.tiers.forEach((item: any, index: number) => {
      this.handleAddTier(item, index);
    });
  }

  handleInitForm(): void {
    this.packageForm = this._fb.group({
      offerId: ['', Validators.compose([Validators.required])],
      sponsorId: [
        this.data.sponsorId || '',
        Validators.compose([Validators.required]),
      ],
      tiers: this._fb.array([]),
    });
  }

  tierControls() {
    return this.packageForm.controls['tiers'] as FormArray;
  }

  contentHTMLControls(tierIndex: number) {
    return this.tierControls().at(tierIndex).get('contentHTML') as FormArray;
  }

  addTier(item: any, data: any, tierIndex: number) {
    this.tierControls().push(data);

    _.forEach(item['contentHTML'] || [], (t) => {
      this.handleAddConntent(tierIndex);
    });
  }

  addContent(data: any, tierIndex: number) {
    this.contentHTMLControls(tierIndex).push(data);
  }

  handleAddConntent(tierIndex: number) {
    const content = this._fb.group({
      privilegeContent: [''],
      termContent: [''],
    });

    this.addContent(content, tierIndex);
  }

  handleAddTier(item: any, index: number) {
    const tier = this._fb.group({
      amount: ['', Validators.compose([Validators.required])],
      expiredMonth: [''],
      contentHTML: this._fb.array([]),
    });

    this.addTier(item, tier, index);
  }

  handleSubmitForm(index: number): void {
    this._formTabService.setFormStatus(this.packageForm.valid);

    if (this.haveFieldsErrors) {
      const errorFields = getFormValidationErrors(this.packageForm, index);
      this._formTabService.setFormFieldError(errorFields);
    } else {
      this._formTabService.setFormFieldError([]);
    }

    if (this.packageForm.valid) {
      // console.log({
      //   langCode: this.data.langCode,
      //   ...this.packageForm.value,
      // });
    } else {
      markDirtyForm(this.packageForm);
    }
  }
}

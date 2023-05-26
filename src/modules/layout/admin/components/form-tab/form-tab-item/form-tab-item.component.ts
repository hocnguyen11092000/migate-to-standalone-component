import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getFormValidationErrors, markDirtyForm } from 'src/utils';
import { FormTabCheckValidAllField } from '../../../services/form-tab-check-valid-all-form.service';

@Component({
  selector: 'app-form-tab-item',
  templateUrl: './form-tab-item.component.html',
  styleUrls: ['./form-tab-item.component.scss'],
})
export class FormTabItemComponent implements OnInit {
  @Input() data: any;
  packageForm!: FormGroup;
  haveFieldsErrors: boolean = true;

  constructor(
    private _fb: FormBuilder,
    private _formTabService: FormTabCheckValidAllField
  ) {}

  ngOnInit(): void {
    this.handleInitForm();

    this.data.tiers.forEach((item: any) => {
      this.handleAddTier(item);
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

  get tiers() {
    return this.packageForm.controls['tiers'] as FormArray;
  }

  handleAddTier(item?: any) {
    const tier = this._fb.group({
      amount: ['', Validators.compose([Validators.required])],
      expiredMonth: [''],
    });

    this.tiers.push(tier);
  }

  handleSubmitForm(index?: number): void {
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

import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-tab-item',
  templateUrl: './form-tab-item.component.html',
  styleUrls: ['./form-tab-item.component.scss'],
})
export class FormTabItemComponent implements OnInit {
  @Input() data: any;
  packageForm!: any | FormGroup;
  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.handleInitForm();

    this.data.tiers.forEach((item: any) => {
      this.handleAddTier(item);
    });
  }

  handleInitForm(): void {
    this.packageForm = this._fb.group({
      offerId: [
        this.data.offerId || '',
        Validators.compose([Validators.required]),
      ],
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
      amount: [''],
      expiredMonth: [''],
    });

    this.tiers.push(tier);
  }

  handleSubmitForm(): void {
    if (this.packageForm.valid) {
      console.log({
        langCode: this.data.langCode,
        ...this.packageForm.value,
      });
    } else {
      Object.values(this.packageForm.controls).forEach((control: any) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}

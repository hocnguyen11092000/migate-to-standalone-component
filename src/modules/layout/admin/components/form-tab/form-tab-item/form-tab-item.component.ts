import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { getFormValidationErrors, markDirtyForm } from 'src/utils';
import { FormTabCheckValidAllField } from '../../../services/form-tab-check-valid-all-form.service';
import * as _ from 'lodash';
import { takeWhile, tap } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
    selector: 'app-form-tab-item',
    templateUrl: './form-tab-item.component.html',
    styleUrls: ['./form-tab-item.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, NzFormModule, NzGridModule, NzInputModule, NzTabsModule, NgFor, NgIf]
})
export class FormTabItemComponent implements OnInit {
  @Input() data: any;
  packageForm!: FormGroup;
  haveFieldsErrors: boolean = true;
  level: number = 1;
  @Output() oChanging = new EventEmitter<boolean>();

  constructor(
    private _fb: FormBuilder,
    private _formTabService: FormTabCheckValidAllField
  ) {}

  ngOnInit(): void {
    this.handleInitForm();

    this.data.tiers.forEach((item: any, index: number) => {
      this.InitTierControl(item, index);
    });

    //listend form value changes
    const isChanging$ = this.packageForm.valueChanges
      .pipe(
        tap(() => {
          if (this.packageForm.dirty) {
            this.oChanging.emit(true);
            isChanging$.unsubscribe();
          }
        })
      )
      .subscribe();

    this.packageForm.controls['offerId'].setValue('offer 1232');
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

  getTierControl() {
    return this.packageForm.controls['tiers'] as FormArray;
  }

  InitTierControl(item: any, index: number) {
    const tier = this._fb.group({
      amount: ['', Validators.compose([Validators.required])],
      expiredMonth: [''],
      contentHTML: this._fb.array([]),
    });

    this.pushTier(item, tier, index);
  }

  pushTier(item: any, data: any, tierIndex: number) {
    this.getTierControl().push(data);

    _.forEach(item['contentHTML'] || [], (t) => {
      this.InitContentHTMLControl(tierIndex);
    });
  }

  getContentHTMLControls(tierIndex: number) {
    return this.getTierControl().at(tierIndex).get('contentHTML') as FormArray;
  }

  InitContentHTMLControl(tierIndex: number) {
    const content = this._fb.group({
      privilegeContent: [
        '',
        Validators.compose([Validators.required, Validators.min(3)]),
      ],
      termContent: [''],
    });

    this.pushContentHTML(content, tierIndex);
  }

  pushContentHTML(data: any, tierIndex: number) {
    this.getContentHTMLControls(tierIndex).push(data);
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

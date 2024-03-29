import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import * as _ from 'lodash';
import { markDirtyForm } from 'src/utils';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NgIf, NgFor } from '@angular/common';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-form-array-reactive-form',
  templateUrl: './form-array-reactive-form.component.html',
  styleUrls: ['./form-array-reactive-form.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzWaveModule,
    NgIf,
    NzCollapseModule,
    NgFor,
    NzGridModule,
    NzFormModule,
    NzInputModule,
  ],
})
export class FormArrayReactiveFormComponent implements OnInit {
  passengerForm!: FormGroup;
  passengerInfo: any = {
    adults: 5,
    children: 1,
    infants: 1,
  };

  toAdultsArray = _.range(_.get(this.passengerInfo, 'adults'));
  toChildrenArray = _.range(_.get(this.passengerInfo, 'children'));
  toInfantsArray = _.range(_.get(this.passengerInfo, 'infants'));

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.initPassengerForm();

    if (this.toAdultsArray) {
      this.initAdultForm();
    }

    if (this.toChildrenArray) {
      this.initChildrenForm();
    }

    if (this.toInfantsArray) {
      this.initInfantsForm();
    }
  }

  //#region init form
  private initPassengerForm(): void {
    this.passengerForm = this._fb.group({
      adults: this._fb.array([]),
      children: this._fb.array([]),
      infants: this._fb.array([]),
    });
  }

  private initAdultForm(): void {
    _.forEach(this.toAdultsArray, (_) => {
      this.initAdultControl();
    });
  }

  private initChildrenForm(): void {
    _.forEach(this.toChildrenArray, (_) => {
      this.initChildrenControl();
    });
  }

  private initInfantsForm(): void {
    _.forEach(this.toInfantsArray, (_) => {
      this.initInfantsControl();
    });
  }
  //#endregion init form

  //#region for adultss
  private getAdultsConrol(): FormArray {
    return this.passengerForm.controls['adults'] as FormArray;
  }

  private initAdultControl(): void {
    const _adult = this._fb.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
    });

    this.pushAdults(_adult);
  }

  private pushAdults(data: any): void {
    this.getAdultsConrol().push(data);
  }
  //#endregion for adultss

  //#region for children
  private getChildrenControl(): FormArray {
    return this.passengerForm.controls['children'] as FormArray;
  }

  private initChildrenControl(): void {
    const _children = this._fb.group({
      firstName: [''],
      lastName: [''],
    });

    this.pushChildren(_children);
  }

  private pushChildren(data: any): void {
    this.getChildrenControl().push(data);
  }
  //#endregion for children

  //#region for infants
  private getInfantsControl(): FormArray {
    return this.passengerForm.controls['infants'] as FormArray;
  }

  private initInfantsControl(): void {
    const _infant = this._fb.group({
      firstName: [''],
      lastName: [''],
      flyWith: [''],
    });

    this.pushInfants(_infant);
  }

  private pushInfants(data: any): void {
    this.getInfantsControl().push(data);
  }
  //#endregion for infants

  //#endregion handle submit form
  handleSubmitForm() {
    if (this.passengerForm.valid) {
      console.log(this.passengerForm.value);
    } else {
      markDirtyForm(this.passengerForm);
    }
  }
  //#endregion handle submit form

  log() {
    console.log('log from form array reactive form');
  }
}

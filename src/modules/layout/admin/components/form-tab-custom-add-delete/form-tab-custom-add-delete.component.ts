import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-tab-custom-add-delete',
  templateUrl: './form-tab-custom-add-delete.component.html',
  styleUrls: ['./form-tab-custom-add-delete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormTabCustomAddDeleteComponent implements OnInit {
  //#region inject service
  private _fb = inject(FormBuilder);
  private _cdr = inject(ChangeDetectorRef);
  //#endregion inject service

  //#region variables
  testForm!: FormGroup;
  //#endregion variables
  constructor() {}

  ngOnInit() {
    this.initCoreForm();

    this.addTestForm();
  }

  initCoreForm() {
    this.testForm = this._fb.group({
      item: this._fb.array([]),
    });
  }

  initTestForm() {
    const testFormItem = this._fb.group({
      a1: [''],
      a2: this._fb.array([]),
    });

    return testFormItem;
  }

  getTestFormItem() {
    return (this.testForm.get('item') as FormArray)?.controls;
  }

  addTestForm() {
    this.getTestFormItem()?.push(this.initTestForm());
  }

  initBForm() {
    const bForm = this._fb.group({
      b1: [''],
      b2: this._fb.array([]),
    });

    return bForm;
  }

  getbFormControl(aIndex: number) {
    return (this.getTestFormItem().at(aIndex)?.get('a2') as FormArray)
      ?.controls;
  }

  addBControl(i: number) {
    this.getbFormControl(i).push(this.initBForm());
  }

  initCControl() {
    const cControl = this._fb.group({
      c1: [''],
    });

    return cControl;
  }

  getCControl(ai: number, bi: number) {
    return (this.getbFormControl(ai).at(bi)?.get('b2') as FormArray)?.controls;
  }

  addCControl(a1: number, bi: number) {
    return this.getCControl(a1, bi)?.push(this.initCControl());
  }

  handleSubmit() {
    console.log(this.testForm.getRawValue());
  }
}

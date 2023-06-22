/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormArrayReactiveFormComponent } from './form-array-reactive-form.component';

describe('FormArrayReactiveFormComponent', () => {
  let component: FormArrayReactiveFormComponent;
  let fixture: ComponentFixture<FormArrayReactiveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [FormArrayReactiveFormComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArrayReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

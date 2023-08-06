/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormTabCustomAddDeleteComponent } from './form-tab-custom-add-delete.component';

describe('FormTabCustomAddDeleteComponent', () => {
  let component: FormTabCustomAddDeleteComponent;
  let fixture: ComponentFixture<FormTabCustomAddDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTabCustomAddDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTabCustomAddDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

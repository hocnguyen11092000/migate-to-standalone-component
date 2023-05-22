import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayNgModelComponent } from './form-array-ng-model.component';

describe('FormArrayNgModelComponent', () => {
  let component: FormArrayNgModelComponent;
  let fixture: ComponentFixture<FormArrayNgModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormArrayNgModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormArrayNgModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

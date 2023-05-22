import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTabItemComponent } from './form-tab-item.component';

describe('FormTabItemComponent', () => {
  let component: FormTabItemComponent;
  let fixture: ComponentFixture<FormTabItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTabItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTabItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

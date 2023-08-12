import { Component, HostBinding, OnInit } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DirectiveCompositionApiDirective } from '../../directives/directive-composition-api.directive';

@Component({
  selector: 'app-custom-control-value-assesor',
  templateUrl: './custom-control-value-assesor.component.html',
  styleUrls: ['./custom-control-value-assesor.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomControlValueAssesorComponent,
      multi: true,
    },
  ],
  imports: [NzSelectModule, FormsModule],
  hostDirectives: [
    {
      directive: DirectiveCompositionApiDirective,
      inputs: ['appearance'],
    },
  ],
})
export class CustomControlValueAssesorComponent implements OnInit {
  value = '';
  // @HostBinding('class.someClass') someField: boolean = false;
  constructor() {}

  onChange = (value: string) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  changeSelect(value: string) {
    this.onChange(value);
  }

  ngOnInit() {
    // this.someField = true;
  }
}

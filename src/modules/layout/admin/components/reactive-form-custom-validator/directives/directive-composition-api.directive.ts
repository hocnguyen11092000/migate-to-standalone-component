import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appDirectiveCompositionApi]',
  standalone: true,
})
export class DirectiveCompositionApiDirective {
  constructor() {}

  @Input()
  appearance: 'solid' | 'stroked' = 'solid';

  @HostBinding('class')
  protected get computedHostClass() {
    return `df-${[this.appearance]}`;
  }
}

import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

@Directive({
  selector: '[nzStringTemplateOutlet]',
  exportAs: 'nzStringTemplateOutlet',
  standalone: true,
})
export class StringTemplateOutletDirective implements OnChanges {
  @Input() nzStringTemplateOutlet: any | TemplateRef<any> = null;
  @Input() nzStringTemplateOutletContext: any | TemplateRef<any> = null;

  private embeddedViewRef: EmbeddedViewRef<any> | null = null;
  private context = new NzStringTemplateOutletContext();

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  private recreateView(): void {
    this.viewContainer.clear();
    const isTemplateRef = this.nzStringTemplateOutlet instanceof TemplateRef;
    const templateRef = isTemplateRef
      ? this.nzStringTemplateOutlet
      : this.templateRef;
    this.embeddedViewRef = this.viewContainer.createEmbeddedView(
      templateRef,
      isTemplateRef ? this.nzStringTemplateOutletContext : this.context
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzStringTemplateOutlet } = changes;
    console.log('directive changes', nzStringTemplateOutlet);

    this.recreateView();
  }
}

export class NzStringTemplateOutletContext {
  public $implicit: any;
}

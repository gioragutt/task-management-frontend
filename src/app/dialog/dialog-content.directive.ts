import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormComponent } from './configs';

@Directive({
  selector: '[appDialogContent]',
  exportAs: 'appDialogContent',
})
export class DialogContentDirective<T> implements OnInit {
  @Input() content: Type<FormComponent<T>>;

  get form(): FormGroup {
    return this.componentRef.instance.form;
  }

  private componentRef: ComponentRef<FormComponent<T>>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
  ) { }

  ngOnInit(): void {
    const cf = this.resolver.resolveComponentFactory<FormComponent<T>>(this.content);
    this.componentRef = this.container.createComponent(cf);
  }
}

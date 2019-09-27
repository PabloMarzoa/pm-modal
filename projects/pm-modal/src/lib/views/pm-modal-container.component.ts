import { Component, ComponentFactoryResolver, Inject, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PmModalItem } from '../models/pm-modal-item';

@Component({
  template: ''
})
export class PmModalContainerComponent {

  private factory: any;
  private rootViewContainer;
  private factoryResolver;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PmModalItem,
    @Inject(ComponentFactoryResolver) factoryResolver,
    @Inject(ViewContainerRef) viewContainerRef
  ) {
    this.factoryResolver = factoryResolver;
    this.factory = this.data.params.factory;
    this.setRootViewContainerRef(viewContainerRef);
    this.addDynamicComponent();
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  addDynamicComponent() {
    if (this.factory === null || this.factory === undefined) {
      console.error('Imposible insert null or undefined factory');
      return;
    }
    const component = this.factory
      .create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(component.hostView);
  }
}

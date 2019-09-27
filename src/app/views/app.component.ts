import { PmModalSize } from './../../../projects/pm-modal/src/lib/models/pm-modal-size';
import { PmModalService } from '../../../projects/pm-modal/src/lib/services/pm-modal.service';
import { Component, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { TestModalComponent } from './modal-test/modal-test.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pm-modal';

  constructor(
    private modalService: PmModalService,
    private factoryResolver: ComponentFactoryResolver
  ) {}

  public openModal() {
    const factory: ComponentFactory< any> = this.factoryResolver.resolveComponentFactory(TestModalComponent);
    this.modalService.create({factory, size: PmModalSize.Auto, payload: 'test payload 1'});
    this.modalService.create({factory, size: PmModalSize.Small, payload: 'test payload 2'});
    this.modalService.create({factory, size: PmModalSize.Medium, payload: 'test payload 3'});
    this.modalService.create({factory, size: PmModalSize.Fullscreen, payload: 'test payload 4'});
  }
}

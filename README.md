# PmModalProject
This project extends the angular material modal to add some features:

* You can choose a modal size.
* Has a circular list.
* You can add modals to the list and choose what modal you want to see.
* You can remove any modal from the list.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Modal sizes
You can use 4 different sizes. Modal sizes are defined as an enum, PmModalSize:

* PmModalSize.Auto: Automatic material resize.
* PmModalSize.Small: 35vw x 35vh modal.
* PmModalSize.Medium: 65vw x 65vh modal.
* PmModalSize.Fullscreen: 98vw x 98vh modal.


## Use it on your app
Import the PmModalModule in the module where you are going to use it:

```ts
import { BrowserModule} from ‘@angular/platform-browser’;
import { NgModule } from ‘@angular/core’;
import { AppComponent } from ‘./app.component’;
import { TestModalComponent } from ‘./modal-test/modal-test.component’;
import { PmModalModule } from ‘pm-modal’;

@NgModule({
  declarations: [
    AppComponent,
    TestModalComponent
  ],
  entryComponents: [
    TestModalComponent
  ],
  imports: [
    BrowserModule,
    PmModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Open a new modal
You have to import the PmModalService to create new modals. This method needs a ComponentFactory, PmModalSize and an optional payload:

```ts
import { PmModalSize } from ‘pm-modal’;
import { Component, ComponentFactory, ComponentFactoryResolver } from ‘@angular/core’;
import { TestModalComponent } from ‘./modal-test/modal-test.component’;
import { PmModalService } from ’pm-modal’;

@Component({
  selector: ‘app-root’,
  templateUrl: ‘./app.component.html’,
  styleUrls: [‘./app.component.scss’]
})
export class AppComponent {

  constructor(
    private modalService: PmModalService,
    private factoryResolver: ComponentFactoryResolver
  ) {}

  open() {
    const factory: ComponentFactory< any> = this.factoryResolver.resolveComponentFactory(TestModalComponent);
    this.modalService.create({factory, size: PmModalSize.Auto, payload: ‘test payload 1’});
    this.modalService.create({factory, size: PmModalSize.Small, payload: ‘test payload 2’});
    this.modalService.create({factory, size: PmModalSize.Medium, payload: ‘test payload 3’});
    this.modalService.create({factory, size: PmModalSize.Fullscreen, payload: ‘test payload 4’});
  }
}
```

### PmModalService: all you need

The PmModalService has all the methods you can use:

* Create: adds a new modal.
* DismissCurrent: dismisses current modal.
* DismissAll: clears the modal list.
* GetCurrentPayload: returns the payload of the current modal. You can use it in the inserted component.
* Next: shows next modal.
* Previous: shows previous modal.
* Dispose: returns the modals collection.


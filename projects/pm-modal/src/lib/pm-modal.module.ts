import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material';
import { PmModalCollectionService } from './services/pm-modal-collection.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { PmModalService } from './services/pm-modal.service';
import { PmModalContainerComponent } from './views/pm-modal-container.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PmModalContainerComponent
  ],
  entryComponents: [
    PmModalContainerComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    PmModalService,
    PmModalCollectionService
  ]
})
export class PmModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PmModalModule,
      providers: []
    };
  }
}

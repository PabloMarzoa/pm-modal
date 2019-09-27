import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './views/app.component';
import { PmModalModule } from 'projects/pm-modal/src/public-api';
import { TestModalComponent } from './views/modal-test/modal-test.component';

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
    PmModalModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

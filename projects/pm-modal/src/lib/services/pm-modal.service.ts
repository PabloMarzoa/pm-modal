import { PmModalSize } from './../models/pm-modal-size';
import { PmModalParams } from './../models/pm-modal-params';
import { PmModalItem } from './../models/pm-modal-item';
import { PmModalContainerComponent } from './../views/pm-modal-container.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable, OnDestroy } from '@angular/core';
import { PmModalCollectionService } from './pm-modal-collection.service';
import { takeWhile } from 'rxjs/operators';

@Injectable()
export class PmModalService implements OnDestroy {

  private currentModal: PmModalItem;
  private alive = true;
  private isOpen = false;

  constructor(
    private modalCollection: PmModalCollectionService,
    private matDialog: MatDialog
  ) {
    this.modalCollection.currentModalChanged$
    .pipe(takeWhile(() => this.alive))
    .subscribe((newPmModal: PmModalItem) => {
      this.currentModal =  newPmModal;
      if (newPmModal !== null && newPmModal !== undefined &&
        newPmModal.params.factory !== null && newPmModal.params.factory !== undefined) {
        if (this.isOpen) {
          this.matDialog.closeAll();
        }
        this.isOpen = true;
        this.matDialog.open(PmModalContainerComponent, this.calculateOptions(newPmModal));
      } else {
        this.isOpen = false;
        this.matDialog.closeAll();
      }
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  public create(modalData: PmModalParams) {
    this.modalCollection.add(modalData);
  }

  public dismissCurrent() {
    this.modalCollection.remove(this.currentModal);
  }

  public dismissAll() {
    this.modalCollection.clear();
  }

  public getCurrentPayload(): any {
    return this.currentModal.params.payload;
  }

  public next() {
    this.modalCollection.next();
  }

  public previous() {
    this.modalCollection.previous();
  }

  public dispose() {
    return this.modalCollection.dispose();
  }

  private calculateOptions(modalData: PmModalItem): MatDialogConfig {
    const options: MatDialogConfig = {
      data: modalData,
      closeOnNavigation: true,
      disableClose: true,
      maxWidth: '98vw',
      maxHeight: '98vh'
    };
    if (modalData.params.size === PmModalSize.Small) {
      options.width = '35vw';
      options.height = '35vh';
      options.minWidth = '300px';
      options.minHeight = '300px';
    }
    if (modalData.params.size === PmModalSize.Medium) {
      options.width = '65vw';
      options.height = '65vh';
      options.minWidth = '300px';
      options.minHeight = '300px';
    }
    if (modalData.params.size === PmModalSize.Fullscreen) {
      options.width = '98vw';
      options.height = '98vh';
      options.minWidth = '300px';
      options.minHeight = '300px';
    }
    return options;
  }
}

import { PmModalParams } from './../models/pm-modal-params';
import { PmModalItem } from './../models/pm-modal-item';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PmModalCollectionService {
  private currentModal: PmModalItem;
  private modalCollection: PmModalItem[] = [];

  private currentModalSource: ReplaySubject< PmModalItem> = new ReplaySubject< PmModalItem>();
  public currentModalChanged$: Observable< PmModalItem> = this.currentModalSource.asObservable();

  public next() {
    const index = this.getIndexById(this.currentModal.id);
    const collectionLength = this.modalCollection.length;
    if (collectionLength < 1) {
      return;
    }
    if (index === collectionLength - 1) {
      this.currentModal = this.modalCollection[0];
    } else {
      this.currentModal = this.modalCollection[index + 1];
    }
    this.currentModalSource.next(this.currentModal);
  }

  public previous() {
    const index = this.getIndexById(this.currentModal.id);
    const collectionLength = this.modalCollection.length;
    if (collectionLength < 1) {
      return;
    }
    if (index === 0) {
      this.currentModal = this.modalCollection[collectionLength - 1];
    } else {
      this.currentModal = this.modalCollection[index - 1];
    }
    this.currentModalSource.next(this.currentModal);
  }

  public add(modalData: PmModalParams) {
    const newPmModal = {
      id: ((Math.random() * 6) + 1).toString(),
      params: modalData
    };
    this.currentModal = newPmModal;
    this.modalCollection.push(newPmModal);
    this.currentModalSource.next(newPmModal);
  }

  public remove(modal: PmModalItem) {
    const index = this.getIndexById(modal.id);
    const collectionLength = this.modalCollection.length;
    if (index === 0) {
      if (collectionLength === 1) {
        this.currentModal = null;
      } else {
        this.currentModal = this.modalCollection[1];
      }
    } else {
      if (index === collectionLength - 1) {
        this.currentModal = this.modalCollection[index - 1];
      } else {
        this.currentModal = this.modalCollection[index + 1];
      }
    }
    this.modalCollection.splice(index, 1);
    this.currentModalSource.next(this.currentModal);
  }

  public dispose() {
    return this.modalCollection;
  }

  public clear() {
    this.modalCollection = [];
    this.currentModalSource.next(null);
  }

  public getCurrentModal(): PmModalItem {
    return this.currentModal;
  }

  private getIndexById(id: string) {
    return this.modalCollection.findIndex((item: PmModalItem) => item.id === id);
  }
}

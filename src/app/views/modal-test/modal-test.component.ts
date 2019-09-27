import { PmModalService } from './../../../../projects/pm-modal/src/lib/services/pm-modal.service';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'modal-test.component.html',
  styleUrls: ['modal-test.component.scss']
})
export class TestModalComponent {

  public payload;

  constructor(
    private modalService: PmModalService
  ) {
    this.payload = this.modalService.getCurrentPayload();
  }

  closeModal() {
    this.modalService.dismissCurrent();
  }

  next() {
    this.modalService.next();
  }

  previous() {
    this.modalService.previous();
  }
}

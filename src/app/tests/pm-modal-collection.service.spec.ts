import { PmModalSize } from './../../../projects/pm-modal/src/lib/models/pm-modal-size';
import { PmModalParams } from './../../../projects/pm-modal/src/lib/models/pm-modal-params';
import { async, inject, TestBed } from '@angular/core/testing';
import { PmModalModule } from '../../../projects/pm-modal/src/lib/pm-modal.module';
import { PmModalCollectionService } from '../../../projects/pm-modal/src/lib/services/pm-modal-collection.service';
import { TestModalComponent } from '../views/modal-test/modal-test.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('PmModal', () => {
  const modalParams1: PmModalParams = {
    factory: null,
    payload: 'Test Payload 1',
    size: PmModalSize.Auto
  };
  const modalParams2: PmModalParams = {
    factory: null,
    payload: 'Test Payload 2',
    size: PmModalSize.Auto
  };

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      imports: [
        PmModalModule
      ],
      declarations: [
        TestModalComponent
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ TestModalComponent ],
      }
    });
  }));

  it('should be empty', async(inject([PmModalCollectionService], (svn: PmModalCollectionService) => {
    svn.clear();
    const emptyModalList = svn.dispose();
    expect(emptyModalList.length).toBe(0);
  })));

  it('should create a modal', async(inject([PmModalCollectionService], (svn: PmModalCollectionService) => {
    svn.add(modalParams1);
    const modalList = svn.dispose();
    expect(modalList.length).toBe(1);
    expect(modalList[0].params.payload).toContain('Test Payload 1');
  })));

  it('should dismiss current modal', async(inject([PmModalCollectionService], (svn: PmModalCollectionService) => {
    svn.clear();
    svn.add(modalParams1);
    svn.add(modalParams2);
    expect(svn.getCurrentModal().params.payload).toEqual('Test Payload 2');
    const currentModal = svn.getCurrentModal();
    svn.remove(currentModal);
    expect(svn.getCurrentModal().params.payload).toEqual('Test Payload 1');
  })));

  it('should change current modal', async(inject([PmModalCollectionService], (svn: PmModalCollectionService) => {
    svn.clear();
    svn.add(modalParams1);
    svn.add(modalParams2);
    expect(svn.getCurrentModal().params.payload).toEqual('Test Payload 2');
    svn.previous();
    expect(svn.getCurrentModal().params.payload).toEqual('Test Payload 1');
    svn.next();
    expect(svn.getCurrentModal().params.payload).toEqual('Test Payload 2');
  })));
});

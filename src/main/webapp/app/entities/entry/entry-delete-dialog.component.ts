import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEntry } from 'app/shared/model/entry.model';
import { EntryService } from './entry.service';

@Component({
  selector: 'jhi-entry-delete-dialog',
  templateUrl: './entry-delete-dialog.component.html'
})
export class EntryDeleteDialogComponent {
  entry: IEntry;

  constructor(protected entryService: EntryService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.entryService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'entryListModification',
        content: 'Deleted an entry'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-entry-delete-popup',
  template: ''
})
export class EntryDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ entry }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EntryDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.entry = entry;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/entry', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/entry', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}

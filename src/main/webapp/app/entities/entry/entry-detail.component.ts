import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IEntry } from 'app/shared/model/entry.model';

@Component({
  selector: 'jhi-entry-detail',
  templateUrl: './entry-detail.component.html'
})
export class EntryDetailComponent implements OnInit {
  entry: IEntry;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ entry }) => {
      this.entry = entry;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}

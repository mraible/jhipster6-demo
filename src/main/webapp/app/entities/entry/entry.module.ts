import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BlogSharedModule } from 'app/shared';
import {
  EntryComponent,
  EntryDetailComponent,
  EntryUpdateComponent,
  EntryDeletePopupComponent,
  EntryDeleteDialogComponent,
  entryRoute,
  entryPopupRoute
} from './';

const ENTITY_STATES = [...entryRoute, ...entryPopupRoute];

@NgModule({
  imports: [BlogSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [EntryComponent, EntryDetailComponent, EntryUpdateComponent, EntryDeleteDialogComponent, EntryDeletePopupComponent],
  entryComponents: [EntryComponent, EntryUpdateComponent, EntryDeleteDialogComponent, EntryDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogEntryModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
